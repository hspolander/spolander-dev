import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
import _ from "lodash";
import cheerio from "cheerio";
const https = require("https");
import fetch from "node-fetch";
import browserObject from "../scrape/browser";
import scraperController from "../scrape/pageController";

import {
  getWineById,
  getUuidByUser,
  getUuidByUuid,
  getGrapesByWine,
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
  getSystembolagVolumes,
  getSystembolagTypes,
  insertReview,
  insertWine,
  insertGrape,
  insertUser,
  insertUuid,
  updateUuid,
  updateUuidTtl,
  setUuidExpired,
} from "../controller/queries";

const fetchData = async (period) => {
  let browserInstance = browserObject.startBrowser();
  return scraperController(browserInstance, period);
};

export default (server) => {
  server.get("/api/populateSystembolagetTables", async (req, res, next) => {
    const cookies = req.cookies;

    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      fetchData(req.query.period ? req.query.period : null);
      res.json({
        error: false,
        Message: "Pull wines initiated",
      });
    } else {
      res.clearCookie("WINE_UUID");
      res.json({
        error: true,
        session: "nosessionRedirect",
        message: "Session expired/invalid",
        data: null,
      });
    }
  });

  server.get("/api/getAllById", async (req, res, next) => {
    const cookies = req.cookies;
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      id;
      let wine = await getWineById(req.query.id);
      let grapes = await getGrapesByWine(wine.id);
      let reviews = await getReviewsByWine(wine.id);
      res.json({
        error: false,
        Message: "Success",
        data: {
          grapes: grapes,
          reviews: reviews,
        },
      });
    } else {
      res.clearCookie("WINE_UUID");
      res.json({
        error: true,
        session: "nosessionRedirect",
        message: "Session expired/invalid",
        data: null,
      });
    }
  });

  server.get("/api/getWineByForeignProperty", async (req, res, next) => {
    const cookies = req.cookies;
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      const query = req.query;
      let wines = await getWineByForeignProperty(
        query.table,
        query.property,
        query.value
      );
      var result = [];
      for (var i = 0; i < wines.length; i++) {
        let wine = await getWineById(wines[i].id);
        let grapes = await getGrapesByWine(wines[i].id);
        let reviews = await getReviewsByWine(wines[i].id);
        result.push({
          wine: wine,
        });
        result[i].wine.grapes = grapes;
        result[i].wine.reviews = reviews;
      }
      if (query.orderedProp) {
        if (query.orderedProp === "year" || query.orderedProp === "score") {
          result.sort(function (a, b) {
            return a.wine[query.orderedProp] - b.wine[query.orderedProp];
          });
        } else {
          result.sort(function (a, b) {
            var nameA = a.wine[query.orderedProp]?.toUpperCase(); // ignore upper and lowercase
            var nameB = b.wine[query.orderedProp]?.toUpperCase(); // ignore upper and lowercase
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
        message: "Success",
        data: result,
      });
    } else {
      res.clearCookie("WINE_UUID");
      res.json({
        error: true,
        session: "nosessionRedirect",
        message: "Session expired/invalid",
        data: null,
      });
    }
  });

  server.get("/api/getAllReviews", async (req, res, next) => {
    const cookies = req.cookies;
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      const query = req.query;
      let wines = await getAllNotCellarWines();
      var result = [];
      for (var i = 0; i < wines.length; i++) {
        let wine = await getWineById(wines[i].id);
        let grapes = await getGrapesByWine(wines[i].id);
        let reviews = await getReviewsByWine(wines[i].id);
        if (reviews[0]) {
          wine.grapes = grapes;
          wine.reviews = reviews;
          result.push({
            wine: wine,
          });
        }
      }
      if (query.orderedProp) {
        if (query.orderedProp === "year") {
          result.sort(function (a, b) {
            return b.wine[query.orderedProp] - a.wine[query.orderedProp];
          });
        } else if (query.orderedProp === "price") {
          result.sort(function (a, b) {
            return (
              parseInt(a.wine[query.orderedProp].replace(" kr", "")) -
              parseInt(b.wine[query.orderedProp].replace(" kr", ""))
            );
          });
        } else if (query.orderedProp === "score") {
          result.sort(function (a, b) {
            return (
              b.wine?.reviews[0][query.orderedProp] -
              a.wine?.reviews[0][query.orderedProp]
            );
          });
        } else {
          result.sort(function (a, b) {
            var nameA = a.wine[query.orderedProp]?.toUpperCase(); // ignore upper and lowercase
            var nameB = b.wine[query.orderedProp]?.toUpperCase(); // ignore upper and lowercase
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
        message: "Success",
        data: result,
      });
    } else {
      res.clearCookie("WINE_UUID");
      res.json({
        error: true,
        session: "nosessionRedirect",
        message: "Session expired/invalid",
        data: null,
      });
    }
  });

  server.get("/api/getWineByProperty", async (req, res, next) => {
    const cookies = req.cookies;
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      const query = req.query;
      let wines = await getWineByProperty(query.property, query.value);
      var result = [];
      for (var i = 0; i < wines.length; i++) {
        let wine = await getWineById(wines[i].id);
        let grapes = await getGrapesByWine(wines[i].id);
        let reviews = await getReviewsByWine(wines[i].id);
        result.push({
          wine: wine,
        });
        result[i].wine.grapes = grapes;
        result[i].wine.reviews = reviews;
      }
      if (query.orderedProp) {
        if (query.orderedProp === "year" || query.orderedProp === "score") {
          result.sort(function (a, b) {
            return a.wine[query.orderedProp] - b.wine[query.orderedProp];
          });
        } else {
          result.sort(function (a, b) {
            var nameA = a.wine[query.orderedProp]?.toUpperCase(); // ignore upper and lowercase
            var nameB = b.wine[query.orderedProp]?.toUpperCase(); // ignore upper and lowercase
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
        message: "Success",
        data: result,
      });
    } else {
      res.clearCookie("WINE_UUID");
      res.json({
        error: true,
        session: "nosessionRedirect",
        message: "Session expired/invalid",
        data: null,
      });
    }
  });

  server.post("/api/insertWineReview", async (req, res, next) => {
    const cookies = req.cookies;
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      const body = req.body;
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
        body.wineUrl
      );
      let user = await getUserByUsername(cookies.username);
      await insertReview(wineId, user.name, body.comment, body.score);
      if (body.grapes) {
        for (var i = 0; i < body.grapes.length; i++) {
          insertGrape(wineId, body.grapes[i]);
        }
      }
      res.json({ error: false, message: "Allt väl", data: null });
    } else {
      res.clearCookie("WINE_UUID");
      res.json({
        error: true,
        session: "nosession",
        message: "Session expired/invalid",
        data: null,
      });
    }
  });

  server.post("/api/getSysWineGrapesInfo", async (req, res, next) => {
    const cookies = req.cookies;
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      const url = req.body.url;
      let allrows;
      let body = await fetch(url);
      body = await body.text();
      let page = cheerio.load(body);
      let listprops = page("#destopview ul li");
      for (var j = 0; j < listprops.length; j++) {
        let liItem = page(listprops[j]);
        if (liItem.find("h3").text().indexOf("Råvaror") > -1) {
          allrows = liItem.find("p");
          liItem.find("div").remove();
          allrows = liItem
            .html()
            .replace(
              /<\/button>|samt|och|\.|,|\d%|\d\d%|\d\d\d%|<p>|<\/p>/g,
              "\r\n"
            );
          allrows = allrows.split(/\r\n|<\/button>|<button /);
          for (var i = 0; i < allrows.length; i++) {
            allrows[i] = allrows[i].trim();
            if (allrows[i] && allrows[i].startsWith("class")) {
              allrows.splice(i, 1);
              i = i - 1;
            }
            if (allrows[i] && allrows[i].startsWith("<h3")) {
              allrows.splice(i, 1);
              i = i - 1;
            }
            if (allrows[i] && allrows[i].startsWith("R&#xE5;varor")) {
              allrows.splice(i, 1);
              i = i - 1;
            }
            if (allrows[i] && allrows[i].endsWith("</p>")) {
              allrows.splice(i, 1);
              i = i - 1;
            }
            if (allrows[i] !== undefined && allrows[i].length < 2) {
              allrows.splice(i, 1);
              i = i - 1;
            }
          }
        }
      }
      if (!allrows) {
        allrows = [];
      }
      for (var i = 0; i < allrows.length; i++) {
        allrows[i] =
          allrows[i].charAt(0)?.toUpperCase() +
          allrows[i]
            .slice(1)
            .replace("&#xE8;", "é")
            .replace("&#xD1;", "Ñ")
            .replace("&#xC9;", "É")
            .replace("&#xF1;", "ñ");
      }
      res.json({ error: false, message: "Allt väl", data: allrows });
    } else {
      res.clearCookie("WINE_UUID");
      res.json({
        error: true,
        session: "nosessionRedirect",
        message: "Session expired/invalid",
        data: null,
      });
    }
  });

  server.post("/api/createUser", async (req, res, next) => {
    let user = req.body;
    const cookies = req.cookies;
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      if (validateLoginObject(user)) {
        bcrypt.hash(user.password, 11, function (err, hash) {
          insertUser(user.username, hash, user.name);
          res.json({
            error: true,
            message: `Användare ${user.name} tillagd!`,
            data: null,
          });
        });
      } else {
        res.clearCookie("WINE_UUID");
        res.json({
          error: true,
          session: "nosessionRedirect",
          message: "Session expired/invalid",
          data: null,
        });
      }
    }
  });

  server.post("/api/login", async (req, res, next) => {
    let login = req.body;
    res.clearCookie("WINE_UUID");
    if (validateLoginObject(login)) {
      let hash = await getHashByUsername(login.username);
      if (hash) {
        bcrypt
          .compare(login.password, hash)
          .then(function (response) {
            if (response) {
              var uuid = uuidv4();
              res.setCookie("WINE_UUID", uuid, { maxAge: 28800000 });
              res.json({
                error: false,
                message: "Login successful",
                data: { UUID: uuid, login: login },
              });
              writeUuidToDatabase(uuid, login.username);
            } else {
              res.json({
                error: true,
                message: "Login unsuccessful",
                session: "nosession",
                data: null,
              });
            }
          })
          .catch(function (e) {
            console.log(e);
          });
      } else {
        res.json({
          error: true,
          message: "Login unsuccessful",
          session: "nosession",
          data: null,
        });
      }
    }
  });

  server.get("/api/keepalive", async (req, res, next) => {
    const cookies = req.cookies;
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      res.json({
        error: false,
        message: `Poked session for user ${cookies.username}.`,
        data: null,
      });
    } else {
      res.clearCookie("WINE_UUID");
      res.json({
        error: false,
        message: `No live session for user. Please login again`,
        session: "nosession",
        data: null,
      });
    }
  });

  server.get("/api/killSession", async (req, res, next) => {
    const cookies = req.cookies;
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      await setUuidExpired(cookies.WINE_UUID);
    }
    res.clearCookie("WINE_UUID");
    res.json({
      error: false,
      message: `Session killed or missing`,
      session: "nosessionRedirect",
      data: null,
    });
  });

  const validateSession = async (wine_uuid) => {
    const time = getMsTime();
    const uuid_ttl = getUuidTtl();
    const uuid = await getUuidByUuid(wine_uuid);
    if (uuid && time < uuid.ttl) {
      await updateUuidTtl(uuid.id, uuid_ttl);
      console.log(`Poked session for user id ${uuid.fk_user_id}.`);
      return true;
    } else {
      console.log(`Session for user id ${uuid.fk_user_id} has expired.`);
      return false;
    }
  };

  const getUuidTtl = () => {
    let date = new Date();
    let ms = date.getTime();
    return ms + 7200000;
  };

  const getUuidTtlMax = () => {
    let date = new Date();
    let ms = date.getTime();
    return ms + 28800000;
  };

  const getMsTime = () => {
    let date = new Date();
    return date.getTime();
  };

  const writeUuidToDatabase = async (uuid, username) => {
    const user = await getUserByUsername(username);
    const uuid_ttl = getUuidTtl();
    const uuid_ttl_max = getUuidTtlMax();
    const user_uuid = await getUuidByUser(user.id);
    if (user_uuid) {
      updateUuid(user.id, uuid, uuid_ttl, uuid_ttl_max);
    } else {
      insertUuid(user.id, uuid, uuid_ttl, uuid_ttl_max);
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

  server.get("/api/autocompleteSearch", async (req, res, next) => {
    const cookies = req.cookies;
    const associativeArray = {};
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      const autocompleteResponse = await getAutocompleteResponse(
        "%" + req.query.startsWith + "%"
      );

      for (var i = 0; i < autocompleteResponse.length; i++) {
        if (autocompleteResponse[i] !== null) {
          for (var responsetype in autocompleteResponse[i]) {
            associativeArray[responsetype] =
              autocompleteResponse[i][responsetype];
          }
        }
      }
      res.json({ error: false, message: `Success`, data: associativeArray });
    } else {
      res.clearCookie("WINE_UUID");
      res.json({
        error: true,
        session: "nosession",
        message: "Session expired/invalid",
        data: null,
      });
    }
  });

  server.get("/api/getSysWines", async (req, res) => {
    const cookies = req.cookies;
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      const query = req.query;
      let systembolagetWines = await getSystembolagWines(
        query.name,
        query.type,
        query.subType,
        query.country,
        query.price,
        query.year,
        query.description,
        query.volume,
        query.productCode
      );
      res.json({ error: false, message: `Success`, data: systembolagetWines });
    } else {
      res.clearCookie("WINE_UUID");
      res.json({
        error: true,
        session: "nosessionRedirect",
        message: "Session expired/invalid",
        data: null,
      });
    }
  });

  server.get("/api/getAdditionalWineData", async (req, res) => {
    const cookies = req.cookies;
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      const url = req.query.url;

      const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });

      let $;
      await fetch(url, {
        agent: httpsAgent,
      })
        .then((res) => res.text())
        .then((text) => {
          $ = cheerio.load(text);
        });

      res.json({
        error: false,
        message: `Success`,
        data: JSON.parse(
          $(`div[data-react-component="ProductDetailPageContainer"]`).attr(
            "data-props"
          )
        ),
      });
    } else {
      res.clearCookie("WINE_UUID");
      res.json({
        error: true,
        session: "nosessionRedirect",
        message: "Session expired/invalid",
        data: null,
      });
    }
  });

  server.get("/api/getCountries", async (req, res) => {
    const cookies = req.cookies;
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      let countries = await getSystembolagCountries();

      res.json({ error: false, message: `Success`, data: countries });
    } else {
      res.clearCookie("WINE_UUID");
      res.json({
        error: true,
        session: "nosessionRedirect",
        message: "Session expired/invalid",
        data: null,
      });
    }
  });

  server.get("/api/getVolumes", async (req, res) => {
    const cookies = req.cookies;
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      let volumes = await getSystembolagVolumes();

      res.json({ error: false, message: `Success`, data: volumes });
    } else {
      res.clearCookie("WINE_UUID");
      res.json({
        error: true,
        session: "nosessionRedirect",
        message: "Session expired/invalid",
        data: null,
      });
    }
  });

  server.get("/api/getSubTypes", async (req, res) => {
    const cookies = req.cookies;
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      let subTypes = await getSystembolagSubTypes();

      res.json({ error: false, message: `Success`, data: subTypes });
    } else {
      res.clearCookie("WINE_UUID");
      res.json({
        error: true,
        session: "nosessionRedirect",
        message: "Session expired/invalid",
        data: null,
      });
    }
  });

  server.get("/api/getTypes", async (req, res) => {
    const cookies = req.cookies;
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      let types = await getSystembolagTypes();
      res.json({ error: false, message: `Success`, data: types });
    } else {
      res.clearCookie("WINE_UUID");
      res.json({
        error: true,
        session: "nosessionRedirect",
        message: "Session expired/invalid",
        data: null,
      });
    }
  });

  server.get("/api/autocompleteAddWine", async (req, res, next) => {
    const cookies = req.cookies;
    if (
      cookies &&
      cookies.WINE_UUID &&
      (await validateSession(cookies.WINE_UUID))
    ) {
      let autocompleteAddWine = "";
      const responseArray = [];
      if (req.query.systembolagetWines) {
        autocompleteAddWine = await getDistinctFromSystembolagetWines(
          req.query.prop,
          "%" + req.query.startsWith + "%"
        );
      } else if (req.query.prop) {
        autocompleteAddWine = await getDistinctFromWine(
          req.query.prop,
          "%" + req.query.startsWith + "%"
        );
      } else {
        req.query.prop = "grape";
        autocompleteAddWine = await getDistinctFromGrapes(
          "%" + req.query.startsWith + "%"
        );
      }
      if (autocompleteAddWine) {
        for (var i = 0; i < autocompleteAddWine.length; i++) {
          responseArray.push(autocompleteAddWine[i][req.query.prop]);
        }
        res.json({
          error: false,
          message: `Success`,
          data: { prop: req.query.prop, match: responseArray },
        });
      } else {
        res.json({ error: false, message: `Success`, data: null });
      }
    } else {
      res.clearCookie("WINE_UUID");
      res.json({
        error: true,
        session: "nosession",
        message: "Session expired/invalid",
        data: null,
      });
    }
  });
};
