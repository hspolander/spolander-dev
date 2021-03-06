import { query } from "../util/db";
import SQL from "sql-template-strings";

const getRowValues = (table, prop, displayTitle, data) => {
  let arr = [];
  for (var i = 0; i < data.length; i++) {
    arr[i] = { value: data[i][prop], table: table, property: prop };
  }
  arr = { [displayTitle]: arr };
  return arr;
};
const getDistinctYear = (year) =>
  query(
    SQL`SELECT distinct wine.year FROM wine WHERE wine.year like ${year}`
  ).then((cursor) => {
    if (cursor[0][0]) {
      return getRowValues("wine", "year", "År", cursor[0]);
    } else {
      return null;
    }
  });

const getDistinctGrape = (grape) =>
  query(
    SQL`SELECT distinct grapes.grape FROM grapes WHERE grapes.grape like ${grape}`
  ).then((cursor) => {
    if (cursor[0][0]) {
      return getRowValues("grapes", "grape", "Druva", cursor[0]);
    } else {
      return null;
    }
  });

const getDistinctProducer = (producer) =>
  query(
    SQL`SELECT distinct wine.producer FROM wine WHERE wine.producer like ${producer}`
  ).then((cursor) => {
    if (cursor[0][0]) {
      return getRowValues("wine", "producer", "Producent", cursor[0]);
    } else {
      return null;
    }
  });

const getDistinctCountry = (country) =>
  query(
    SQL`SELECT distinct wine.country FROM wine WHERE wine.country like ${country}`
  ).then((cursor) => {
    if (cursor[0][0]) {
      return getRowValues("wine", "country", "Land", cursor[0]);
    } else {
      return null;
    }
  });

const getDistinctType = (type) =>
  query(
    SQL`SELECT distinct wine.type FROM wine WHERE wine.type like ${type}`
  ).then((cursor) => {
    if (cursor[0][0]) {
      return getRowValues("wine", "type", "Färg", cursor[0]);
    } else {
      return null;
    }
  });

const getDistinctName = (name) =>
  query(
    SQL`SELECT distinct wine.name FROM wine WHERE wine.name like ${name}`
  ).then((cursor) => {
    if (cursor[0][0]) {
      return getRowValues("wine", "name", "Vin", cursor[0]);
    } else {
      return null;
    }
  });

const getDistinctReview = (comment) =>
  query(
    SQL`SELECT distinct wine.name FROM reviews, wine WHERE reviews.comment like ${comment} and reviews.fk_wine_id = wine.id `
  ).then((cursor) => {
    if (cursor[0][0]) {
      return getRowValues("wine", "name", "Recension", cursor[0]);
    } else {
      return null;
    }
  });

export const getAutocompleteResponse = (startsWith) => {
  let autocompleteQueries = [
    getDistinctYear(startsWith),
    getDistinctGrape(startsWith),
    getDistinctProducer(startsWith),
    getDistinctCountry(startsWith),
    getDistinctType(startsWith),
    getDistinctName(startsWith),
    getDistinctReview(startsWith),
  ];
  return Promise.all(autocompleteQueries);
};

export const insertSystembolagetWines = (wineArray) => {
  wineArray.forEach(async (wine) => {
    const {
      country,
      description,
      image,
      link,
      name1,
      name2,
      price,
      type,
      volume,
      year,
      subType,
      productCode,
    } = wine;
    let alreadyInserted = await getSystembolagetWineById(productCode);
    if (!alreadyInserted) {
      await insertSystembolagetWine(
        country,
        description,
        image,
        link,
        name1,
        name2,
        price,
        type,
        volume,
        year,
        subType,
        productCode
      );
    } else if (!alreadyInserted?.image) {
      await updateSystembolagetWine(image, productCode);
    }
  });
};

export const getSystembolagWines = async (
  name,
  type,
  subType,
  country,
  price,
  year,
  description,
  volume,
  productCode
) => {
  let statements = [];
  if (name) {
    statements.push(
      ` (name1 like '%` + name + `%' OR name2 like '%` + name + `%') `
    );
  }
  if (type) {
    statements.push(` type like '` + type + `' `);
  }
  if (subType) {
    statements.push(` subType like '` + subType + `' `);
  }
  if (price) {
    statements.push(` price like '` + price + `' `);
  }
  if (year) {
    statements.push(` year like '` + year + `' `);
  }
  if (volume) {
    statements.push(` volume like '` + volume + `' `);
  }
  if (description) {
    statements.push(` description like '%` + description + `%' `);
  }
  if (productCode) {
    statements.push(` productCode like '` + productCode + `' `);
  }
  if (country) {
    statements.push(` country like '` + country + `' `);
  }

  return getSystembolagWinesQuery(statements);
};

export const getSystembolagWineBynr = (nr) =>
  query(
    `SELECT * FROM systembolaget_sortiment WHERE ` + ` nr like ` + nr + `; `
  ).then((cursor) => {
    if (cursor[0][0]) {
      return cursor[0][0];
    } else {
      return null;
    }
  });

export const getSystembolagSubTypes = (type = null) =>
  query(
    `SELECT DISTINCT subType
      FROM systembolaget_wines
      WHERE subType IS NOT NULL
      GROUP BY subType
      ORDER BY COUNT(subType) DESC;
      `
  ).then((cursor) => {
    if (cursor[0]) {
      return cursor[0].map((entity) => {
        return { name: entity.subType, value: entity.subType };
      });
    } else {
      return null;
    }
  });

export const getSystembolagCountries = () =>
  query(
    `SELECT DISTINCT country
          FROM systembolaget_wines
          WHERE country IS NOT NULL
          GROUP BY country
          ORDER BY COUNT(country) DESC;
          `
  ).then((cursor) => {
    if (cursor[0]) {
      return cursor[0].map((entity) => {
        return { name: entity.country, value: entity.country };
      });
    } else {
      return null;
    }
  });

export const getSystembolagVolumes = () =>
  query(
    `SELECT DISTINCT volume
            FROM systembolaget_wines
            WHERE volume IS NOT NULL
            GROUP BY volume
            ORDER BY COUNT(volume) DESC;
            `
  ).then((cursor) => {
    if (cursor[0]) {
      return cursor[0].map((entity) => {
        return { name: entity.volume, value: entity.volume };
      });
    } else {
      return null;
    }
  });

export const getSystembolagTypes = () =>
  query(
    `SELECT DISTINCT type
      FROM systembolaget_wines 
      WHERE type IS NOT NULL
      GROUP BY type
      ORDER BY COUNT(type) DESC;
      `
  ).then((cursor) => {
    if (cursor[0]) {
      return cursor[0].map((entity) => {
        return { name: entity.type, value: entity.type };
      });
    } else {
      return null;
    }
  });

export const getSystembolagWineByArtnr = async (productCode) =>
  query(
    `SELECT * from systembolager_wines WHERE ` +
      ` productCode like ` +
      productCode +
      `; `
  ).then((cursor) => {
    if (cursor[0][0]) {
      return cursor[0][0];
    } else {
      return null;
    }
  });

const getSystembolagWinesQuery = (statements) =>
  query(
    `SELECT * FROM systembolaget_wines WHERE ` +
      statements.join(" AND ") +
      ` ; `
  )
    .then((cursor) => {
      if (cursor[0]) {
        console.log(cursor[0]);
        return cursor[0];
      } else {
        return null;
      }
    })
    .catch(function (e) {
      console.log(e);
    });

export const getDistinctFromWine = (property, value) =>
  query(
    `SELECT distinct wine.${property} FROM wine WHERE wine.${property} like '` +
      value +
      `'`
  ).then((cursor) => {
    if (cursor[0][0]) {
      return cursor[0];
    } else {
      return null;
    }
  });

export const getDistinctFromSystembolagetWines = (property, value) =>
  query(
    `SELECT distinct systembolaget_wines.${property} FROM wine WHERE systembolaget_wines.${property} like '` +
      value +
      `'`
  ).then((cursor) => {
    if (cursor[0][0]) {
      return cursor[0];
    } else {
      return null;
    }
  });

export const getDistinctFromGrapes = (value) =>
  query(
    `SELECT distinct grapes.grape FROM grapes WHERE grapes.grape like '` +
      value +
      `';`
  ).then((cursor) => {
    if (cursor[0][0]) {
      return cursor[0];
    } else {
      return null;
    }
  });

export const getUserByUsername = (username) =>
  query(SQL`SELECT * FROM users WHERE users.username = ${username}`).then(
    (cursor) => {
      if (cursor[0][0]) {
        return cursor[0][0];
      } else {
        return null;
      }
    }
  );

export const getUuidByUser = (id) =>
  query(`SELECT * FROM uuid WHERE fk_user_id = ${id}`).then((cursor) => {
    if (cursor[0][0]) {
      return cursor[0][0];
    } else {
      return null;
    }
  });

export const getUuidByUuid = (uuid) =>
  query(SQL`SELECT * FROM uuid WHERE uuid like ${uuid}`).then((cursor) => {
    if (cursor[0][0]) {
      return cursor[0][0];
    } else {
      return null;
    }
  });

export const getHashByUsername = (username) =>
  query(SQL`SELECT hash FROM users WHERE users.username = ${username}`).then(
    (cursor) => {
      if (cursor[0][0]) {
        return cursor[0][0].hash;
      } else {
        return null;
      }
    }
  );

export const getWineById = (id) =>
  query(`SELECT * FROM wine WHERE wine.id = ${id}`).then((cursor) => {
    if (cursor[0][0]) {
      return cursor[0][0];
    } else {
      return null;
    }
  });

export const getGrapesByWine = (id) =>
  query(`SELECT * FROM grapes WHERE grapes.fk_wine_id = ${id}`).then(
    (cursor) => {
      if (cursor[0]) {
        return cursor[0];
      } else {
        return null;
      }
    }
  );

export const getReviewsByWine = (id) =>
  query(`SELECT * FROM reviews WHERE reviews.fk_wine_id = ${id}`).then(
    (cursor) => {
      if (cursor[0]) {
        return cursor[0];
      } else {
        return null;
      }
    }
  );

export const getWineByForeignProperty = (table, property, value) =>
  query(
    `SELECT wine.id FROM wine, ${table} ` +
      `WHERE ${table}.${property} = '` +
      value +
      `' AND wine.id = ${table}.fk_wine_id`
  ).then((cursor) => {
    if (cursor[0]) {
      return cursor[0];
    } else {
      return null;
    }
  });

export const getWineByProperty = (property, value) =>
  query(
    `SELECT wine.id FROM wine WHERE wine.${property} = '` + value + `'`
  ).then((cursor) => {
    if (cursor[0]) {
      return cursor[0];
    } else {
      return null;
    }
  });

export const getAllNotCellarWines = () =>
  query(`SELECT wine.id FROM wine`).then((cursor) => {
    if (cursor[0]) {
      return cursor[0];
    } else {
      return null;
    }
  });

export const setUuidExpired = (uuid) => {
  query(`UPDATE uuid SET uuid.ttl = 0 where uuid = ?`, [uuid]);
};

export const insertSystembolagetWine = (
  country = null,
  description = null,
  image = null,
  link = null,
  name1 = null,
  name2 = null,
  price = null,
  type = null,
  volume = 0,
  year = null,
  subType = null,
  productCode = null
) =>
  query(
    `INSERT INTO systembolaget_wines(country, description, image, link, name1, name2, price, type, volume, year, productCode, subType) ` +
      `VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      country,
      description,
      image,
      link,
      name1,
      name2,
      price,
      type,
      volume,
      year,
      productCode,
      subType,
    ]
  )
    .then((cursor) => {
      return cursor[0].insertId;
    })
    .catch((error) => {
      console.log(error);
      console.log(productCode);
    });

export const updateSystembolagetWine = (image, productCode) =>
  query(`UPDATE systembolaget_wines SET image = ? WHERE productCode = ?`, [
    image,
    productCode,
  ]).catch((error) => {
    console.log(error);
    console.log(productCode);
  });

export const getSystembolagetWineById = (productCode) =>
  query(
    `SELECT image FROM systembolaget_wines WHERE ` +
      ` productCode like ` +
      productCode +
      `; `
  )
    .then((cursor) => {
      if (cursor[0][0]) {
        return cursor[0][0];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(productCode);
    });

export const insertWine = (
  name = null,
  producer = null,
  type = null,
  subType = null,
  year = null,
  country = null,
  boughtfrom = null,
  price = null,
  container = null,
  incellar = null,
  volume = null,
  nr = null,
  url = null
) =>
  query(
    `INSERT INTO wine(year, name, boughtfrom, price, container, country, type, producer, incellar, volume, nr, url, subType) ` +
      `VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      year,
      name,
      boughtfrom,
      price,
      container,
      country,
      type,
      producer,
      incellar,
      volume,
      nr,
      url,
      subType,
    ]
  ).then((cursor) => {
    return cursor[0].insertId;
  });

export const insertReview = (id, reviewer, comment, score) =>
  query(
    `INSERT INTO reviews (fk_wine_id, reviewer, comment, score) VALUES(?, ?, ?, ?)`,
    [id, reviewer, comment, score]
  );

export const insertGrape = (id, grape) => {
  query(`INSERT INTO grapes (fk_wine_id, grape) VALUES(?, ?)`, [id, grape]);
};

export const insertUser = (username, hash, name) => {
  query(`INSERT INTO users (username, hash, name) VALUES(?, ?, ?)`, [
    username,
    hash,
    name,
  ]);
};

export const insertUuid = (userId, uuid, ttl, ttlMax) => {
  query(
    `INSERT INTO uuid (fk_user_id, uuid, ttl, ttl_max) VALUES(?, ?, ?, ?)`,
    [userId, uuid, ttl, ttlMax]
  );
};

export const updateUuid = (id, uuid, ttl, ttlMax) => {
  query(`UPDATE uuid SET uuid = ?, ttl = ?, ttl_max = ? WHERE fk_user_id = ?`, [
    uuid,
    ttl,
    ttlMax,
    id,
  ]);
};

export const updateUuidTtl = (id, ttl) => {
  query(`UPDATE uuid SET ttl = ? WHERE id = ?`, [ttl, id]);
};
