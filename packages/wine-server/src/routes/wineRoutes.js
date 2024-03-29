import bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';
import browserObject from '../scrape/browser';
import scraperController from '../scrape/pageController';

import {
  getWineById,
  getUuidByUser,
  getUuidByUuid,
  getGrapesByWine,
  getGrapesBySysWine,
  getTasteSymbolsBySysWine,
  getReviewsByWine,
  getUserByUsername,
  getWineByProperty,
  getWineByForeignProperty,
  getDistinctFromSystembolagetWines,
  getHashByUsername,
  getAllNotCellarWines,
  getDistinctFromWine,
  getDistinctFromGrapes,
  getSystembolagWines,
  getAutocompleteResponse,
  getSystembolagCountries,
  getSystembolagSubTypes,
  getSystembolagTypes,
  insertReview,
  insertWine,
  insertGrape,
  insertUser,
  insertUuid,
  updateUuid,
  updateUuidTtl,
  setUuidExpired,
} from '../controller/queries';

const fetchData = async (params) => {
  const browserInstance = browserObject.startBrowser();
  return scraperController(browserInstance, params);
};

const getUuidTtl = () => {
  const date = new Date();
  const ms = date.getTime();
  return ms + 7200000;
};

const getUuidTtlMax = () => {
  const date = new Date();
  const ms = date.getTime();
  return ms + 28800000;
};

const getMsTime = () => {
  const date = new Date();
  return date.getTime();
};

const validateSession = async (wineUuid) => {
  const time = getMsTime();
  const uuidTtl = getUuidTtl();
  const userUuid = await getUuidByUuid(wineUuid);
  if (userUuid && time < userUuid.ttl) {
    await updateUuidTtl(userUuid.id, uuidTtl);
    console.log(`Poked session for user id ${userUuid.fk_user_id}.`);
    return true;
  }
  console.log(`Session for user id ${userUuid.fk_user_id} has expired.`);
  return false;
};

const writeUuidToDatabase = async (newUuid, username) => {
  const user = await getUserByUsername(username);
  const uuidTtl = getUuidTtl();
  const uuidTtlMax = getUuidTtlMax();
  const userUuid = await getUuidByUser(user.id);
  if (userUuid) {
    updateUuid(user.id, newUuid, uuidTtl, uuidTtlMax);
  } else {
    insertUuid(user.id, newUuid, uuidTtl, uuidTtlMax);
  }
};

const validateLoginObject = (login) => {
  if (!login) {
    return false;
  }
  if (!login.username) {
    return false;
  }
  if (!login.password) {
    return false;
  }
  return true;
};

export default (server) => {
  server.get('/api/populateSystembolagetTables', async (req, res) => {
    const { cookies } = req;

    if (
      cookies
      && cookies.WINE_UUID
      && (await validateSession(cookies.WINE_UUID))
    ) {
      res.json({
        error: false,
        Message: 'Pull wines initiated',
      });
      await fetchData('categoryLevel1=Vin&priceTo=80');
      await fetchData('categoryLevel1=Vin&priceFrom=80&priceTo=90');
      await fetchData('categoryLevel1=Vin&priceFrom=90&priceTo=100');
      await fetchData('categoryLevel1=Vin&priceFrom=100&priceTo=115');
      await fetchData('categoryLevel1=Vin&priceFrom=115&priceTo=125');
      await fetchData('categoryLevel1=Vin&priceFrom=125&priceTo=135');
      await fetchData('categoryLevel1=Vin&priceFrom=135&priceTo=150');
      await fetchData('categoryLevel1=Vin&priceFrom=150&priceTo=165');
      await fetchData('categoryLevel1=Vin&priceFrom=165&priceTo=180');
      await fetchData('categoryLevel1=Vin&priceFrom=180&priceTo=195');
      await fetchData('categoryLevel1=Vin&priceFrom=195&priceTo=215');
      await fetchData('categoryLevel1=Vin&priceFrom=215&priceTo=250');
      await fetchData('categoryLevel1=Vin&priceFrom=250&priceTo=275');
      await fetchData('categoryLevel1=Vin&priceFrom=275&priceTo=300');
      await fetchData('categoryLevel1=Vin&priceFrom=300&priceTo=400');
      await fetchData('categoryLevel1=Vin&priceFrom=400&priceTo=500');
      await fetchData('categoryLevel1=Vin&priceFrom=500&priceTo=1000');
      await fetchData('categoryLevel1=Vin&priceFrom=1000');
    } else {
      res.clearCookie('WINE_UUID');
      res.json({
        error: true,
        session: 'nosessionRedirect',
        message: 'Session expired/invalid',
        data: null,
      });
    }
  });

  server.get('/api/getReviews', async (req, res) => {
    const { cookies } = req;
    if (
      cookies
      && cookies.WINE_UUID
      && (await validateSession(cookies.WINE_UUID))
    ) {
      const { query } = req;
      let wines;
      if (!query?.table) {
        wines = await getAllNotCellarWines();
      } else if (query?.table === 'wine') {
        wines = await getWineByProperty(query.property, query.value);
      } else {
        wines = await getWineByForeignProperty(
          query.table,
          query.property,
          query.value,
        );
      }
      const result = [];
      for (let i = 0; i < wines.length; i += 1) {
        const wine = await getWineById(wines[i].id);
        const grapes = await getGrapesByWine(wines[i].id);
        const reviews = await getReviewsByWine(wines[i].id);
        if (reviews[0]) {
          wine.grapes = grapes;
          wine.reviews = reviews;
          result.push({
            wine,
          });
        }
      }

      if (query.orderedProp) {
        if (query.orderedProp === 'year') {
          result.sort(
            (a, b) => b.wine.year - a.wine.year,
          );
        } else if (query.orderedProp === 'price') {
          result.sort(
            (a, b) => parseInt(a.wine.price.replace(' kr', ''), 10)
              - parseInt(b.wine.price.replace(' kr', ''), 10),
          );
        } else if (query.orderedProp === 'score') {
          result.sort(
            (a, b) => b.wine?.reviews[0].score - a.wine?.reviews[0].score,
          );
        } else {
          result.sort((a, b) => {
            const nameA = a.wine[query.orderedProp]?.toUpperCase(); // ignore upper and lowercase
            const nameB = b.wine[query.orderedProp]?.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
        }
      }
      res.json({
        error: false,
        message: 'Success',
        data: result,
      });
    } else {
      res.clearCookie('WINE_UUID');
      res.json({
        error: true,
        session: 'nosessionRedirect',
        message: 'Session expired/invalid',
        data: null,
      });
    }
  });

  server.post('/api/insertWineReview', async (req, res) => {
    const { cookies } = req;
    if (
      cookies
      && cookies.WINE_UUID
      && (await validateSession(cookies.WINE_UUID))
    ) {
      const { body } = req;
      const wineId = await insertWine(
        body.name,
        body.producer,
        body.type,
        body.subType,
        body.year,
        body.country,
        body.boughtFrom,
        body.price,
        body.container,
        0,
        body.volume,
        body.nr,
        body.wineUrl,
      );
      const user = await getUserByUsername(cookies.username);
      await insertReview(wineId, user.name, body.comment, body.score);
      if (body.grapes) {
        for (let i = 0; i < body.grapes.length; i += 1) {
          insertGrape(wineId, body.grapes[i]);
        }
      }
      res.json({ error: false, message: 'Allt väl', data: null });
    } else {
      res.clearCookie('WINE_UUID');
      res.json({
        error: true,
        session: 'nosession',
        message: 'Session expired/invalid',
        data: null,
      });
    }
  });

  server.post('/api/createUser', async (req, res) => {
    const user = req.body;
    const { cookies } = req;
    if (
      cookies
      && cookies.WINE_UUID
      && (await validateSession(cookies.WINE_UUID))
    ) {
      if (validateLoginObject(user)) {
        bcrypt.hash(user.password, 11, (err, hash) => {
          insertUser(user.username, hash, user.name);
          res.json({
            error: true,
            message: `Användare ${user.name} tillagd!`,
            data: null,
          });
        });
      } else {
        res.clearCookie('WINE_UUID');
        res.json({
          error: true,
          session: 'nosessionRedirect',
          message: 'Session expired/invalid',
          data: null,
        });
      }
    }
  });

  server.post('/api/login', async (req, res) => {
    const login = req.body;
    res.clearCookie('WINE_UUID');
    if (validateLoginObject(login)) {
      const hash = await getHashByUsername(login.username);
      if (hash) {
        bcrypt
          .compare(login.password, hash)
          .then((response) => {
            if (response) {
              const uuidv4 = uuid();
              res.setCookie('WINE_UUID', uuidv4, { maxAge: 28800000 });
              res.setCookie('username', login.username, { maxAge: 28800000 });
              res.json({
                error: false,
                message: 'Login successful',
                data: { UUID: uuidv4, login },
              });
              writeUuidToDatabase(uuidv4, login.username);
            } else {
              res.json({
                error: true,
                message: 'Login unsuccessful',
                session: 'nosession',
                data: null,
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        res.clearCookie('WINE_UUID');
        res.clearCookie('username');
        res.code(403);
        res.json({
          error: true,
          message: 'Login unsuccessful',
          session: 'nosession',
          data: null,
        });
      }
    }
  });

  server.get('/api/keepalive', async (req, res) => {
    const { cookies } = req;
    if (
      cookies
      && cookies.WINE_UUID
      && (await validateSession(cookies.WINE_UUID))
    ) {
      res.json({
        error: false,
        message: `Poked session for user ${cookies.username}.`,
        data: true,
      });
    } else {
      res.clearCookie('WINE_UUID');
      res.clearCookie('username');
      res.send(403, {
        error: false,
        message: 'No live session for user. Please login again',
        session: 'nosession',
        data: false,
      });
    }
  });

  server.get('/api/killSession', async (req, res) => {
    const { cookies } = req;
    if (
      cookies
      && cookies.WINE_UUID
      && (await validateSession(cookies.WINE_UUID))
    ) {
      await setUuidExpired(cookies.WINE_UUID);
    }
    res.clearCookie('WINE_UUID');
    res.json({
      error: false,
      message: 'Session killed or missing',
      session: 'nosessionRedirect',
      data: null,
    });
  });

  server.get('/api/autocompleteSearch', async (req, res) => {
    const { cookies } = req;
    const associativeArray = {};
    if (
      cookies
      && cookies.WINE_UUID
      && (await validateSession(cookies.WINE_UUID))
    ) {
      const autocompleteResponse = await getAutocompleteResponse(
        `%${req.query.startsWith}%`,
      );

      for (let i = 0; i < autocompleteResponse.length; i += 1) {
        if (autocompleteResponse[i] !== null) {
          for (const responsetype in autocompleteResponse[i]) {
            associativeArray[responsetype] = autocompleteResponse[i][responsetype];
          }
        }
      }
      res.json({ error: false, message: 'Success', data: associativeArray });
    } else {
      res.clearCookie('WINE_UUID');
      res.json({
        error: true,
        session: 'nosession',
        message: 'Session expired/invalid',
        data: null,
      });
    }
  });

  server.get('/api/getSysWines', async (req, res) => {
    const { cookies } = req;
    if (
      cookies
      && cookies.WINE_UUID
      && (await validateSession(cookies.WINE_UUID))
    ) {
      const { query } = req;
      const {
        name, type, subtype, country, price, vintage, description, volume, productId,
      } = query;
      const systembolagetWines = await getSystembolagWines(name, type, subtype, country, price, vintage, description, volume, productId);
      const winesWithGrapesAndTasteSymbols = await Promise.all(systembolagetWines.map(async (sysWine) => {
        const wineGrapes = await getGrapesBySysWine(sysWine.productId);
        const grapes = wineGrapes.map((grape) => grape.grape);
        const tasteSymbols = await getTasteSymbolsBySysWine(sysWine.productId);
        return {
          ...sysWine, grapes, tasteSymbols,
        };
      }));

      res.json({ error: false, message: 'Success', data: winesWithGrapesAndTasteSymbols });
    } else {
      res.clearCookie('WINE_UUID');
      res.json({
        error: true,
        session: 'nosessionRedirect',
        message: 'Session expired/invalid',
        data: null,
      });
    }
  });

  server.get('/api/getCountries', async (req, res) => {
    const { cookies } = req;
    if (
      cookies
      && cookies.WINE_UUID
      && (await validateSession(cookies.WINE_UUID))
    ) {
      const countries = await getSystembolagCountries();

      res.json({ error: false, message: 'Success', data: countries });
    } else {
      res.clearCookie('WINE_UUID');
      res.json({
        error: true,
        session: 'nosessionRedirect',
        message: 'Session expired/invalid',
        data: null,
      });
    }
  });

  server.get('/api/getSubTypes', async (req, res) => {
    const { cookies } = req;
    if (
      cookies
      && cookies.WINE_UUID
      && (await validateSession(cookies.WINE_UUID))
    ) {
      const subTypes = await getSystembolagSubTypes();

      res.json({ error: false, message: 'Success', data: subTypes });
    } else {
      res.clearCookie('WINE_UUID');
      res.json({
        error: true,
        session: 'nosessionRedirect',
        message: 'Session expired/invalid',
        data: null,
      });
    }
  });

  server.get('/api/getTypes', async (req, res) => {
    const { cookies } = req;
    if (
      cookies
      && cookies.WINE_UUID
      && (await validateSession(cookies.WINE_UUID))
    ) {
      const types = await getSystembolagTypes();
      res.json({ error: false, message: 'Success', data: types });
    } else {
      res.clearCookie('WINE_UUID');
      res.json({
        error: true,
        session: 'nosessionRedirect',
        message: 'Session expired/invalid',
        data: null,
      });
    }
  });

  server.get('/api/autocompleteAddWine', async (req, res) => {
    const { cookies } = req;
    if (
      cookies
      && cookies.WINE_UUID
      && (await validateSession(cookies.WINE_UUID))
    ) {
      let autocompleteAddWine = '';
      const responseArray = [];
      if (req.query.systembolagetWines) {
        autocompleteAddWine = await getDistinctFromSystembolagetWines(
          req.query.prop,
          `%${req.query.startsWith}%`,
        );
      } else if (req.query.prop) {
        autocompleteAddWine = await getDistinctFromWine(
          req.query.prop,
          `%${req.query.startsWith}%`,
        );
      } else {
        req.query.prop = 'grape';
        autocompleteAddWine = await getDistinctFromGrapes(
          `%${req.query.startsWith}%`,
        );
      }
      if (autocompleteAddWine) {
        for (let i = 0; i < autocompleteAddWine.length; i += 1) {
          responseArray.push(autocompleteAddWine[i][req.query.prop]);
        }
        res.json({
          error: false,
          message: 'Success',
          data: { prop: req.query.prop, match: responseArray },
        });
      } else {
        res.json({ error: false, message: 'Success', data: null });
      }
    } else {
      res.clearCookie('WINE_UUID');
      res.json({
        error: true,
        session: 'nosession',
        message: 'Session expired/invalid',
        data: null,
      });
    }
  });
};
