import SQL from 'sql-template-strings';
import booleanAsTinyInt from '../util/booleanAsTinyInt';
import { query } from '../util/db';

const getRowValues = (table, prop, displayTitle, data) => {
  let arr = [];
  for (let i = 0; i < data.length; i += 1) {
    arr[i] = { value: data[i][prop], table, property: prop };
  }
  arr = { [displayTitle]: arr };
  return arr;
};
const getDistinctYear = (year) => query(
  SQL`SELECT distinct wine.year FROM wine WHERE wine.year like ${year}`,
).then((cursor) => {
  if (cursor[0][0]) {
    return getRowValues('wine', 'year', 'År', cursor[0]);
  }
  return null;
});

const getDistinctGrape = (grape) => query(
  SQL`SELECT distinct grapes.grape FROM grapes WHERE grapes.grape like ${grape}`,
).then((cursor) => {
  if (cursor[0][0]) {
    return getRowValues('grapes', 'grape', 'Druva', cursor[0]);
  }
  return null;
});

const getDistinctProducer = (producer) => query(
  SQL`SELECT distinct wine.producer FROM wine WHERE wine.producer like ${producer}`,
).then((cursor) => {
  if (cursor[0][0]) {
    return getRowValues('wine', 'producer', 'Producent', cursor[0]);
  }
  return null;
});

const getDistinctCountry = (country) => query(
  SQL`SELECT distinct wine.country FROM wine WHERE wine.country like ${country}`,
).then((cursor) => {
  if (cursor[0][0]) {
    return getRowValues('wine', 'country', 'Land', cursor[0]);
  }
  return null;
});

const getDistinctType = (type) => query(
  SQL`SELECT distinct wine.type FROM wine WHERE wine.type like ${type}`,
).then((cursor) => {
  if (cursor[0][0]) {
    return getRowValues('wine', 'type', 'Färg', cursor[0]);
  }
  return null;
});

const getDistinctName = (name) => query(
  SQL`SELECT distinct wine.name FROM wine WHERE wine.name like ${name}`,
).then((cursor) => {
  if (cursor[0][0]) {
    return getRowValues('wine', 'name', 'Vin', cursor[0]);
  }
  return null;
});

const getDistinctReview = (comment) => query(
  SQL`SELECT distinct wine.name FROM reviews, wine WHERE reviews.comment like ${comment} and reviews.fk_wine_id = wine.id `,
).then((cursor) => {
  if (cursor[0][0]) {
    return getRowValues('wine', 'name', 'Recension', cursor[0]);
  }
  return null;
});

export const getAutocompleteResponse = (startsWith) => {
  const autocompleteQueries = [
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

export const insertSystembolagetGrape = (id, grape) => {
  query('INSERT INTO systembolaget_grapes (fk_systembolaget_wine_id, grape) VALUES(?, ?)', [id, grape]);
};

export const insertSystembolagetTasteSymbol = (id, tasteSymbol) => {
  query('INSERT INTO systembolaget_taste_symbols (fk_systembolaget_wine_id, taste_symbol) VALUES(?, ?)', [id, tasteSymbol]);
};

export const insertSystembolagetWine = (
  productId = null,
  productNumber = null,
  productNameBold = null,
  productNameThin = null,
  category = null,
  productNumberShort = null,
  producerName = null,
  supplierName = null,
  isKosher = null,
  bottleText = null,
  restrictedParcelQuantity = null,
  isOrganic = null,
  isSustainableChoice = null,
  isClimateSmartPackaging = null,
  isEthical = null,
  isWebLaunch = null,
  productLaunchDate = null,
  isCompletelyOutOfStock = null,
  isTemporaryOutOfStock = null,
  alcoholPercentage = null,
  volumeText = null,
  volume = null,
  price = null,
  country = null,
  originLevel1 = null,
  originLevel2 = null,
  categoryLevel1 = null,
  categoryLevel2 = null,
  categoryLevel3 = null,
  categoryLevel4 = null,
  customCategoryTitle = null,
  assortmentText = null,
  taste = null,
  tasteClockBitter = null,
  tasteClockFruitacid = null,
  tasteClockBody = null,
  tasteClockRoughness = null,
  tasteClockSweetness = null,
  tasteClockSmokiness = null,
  tasteClockCasque = null,
  assortment = null,
  recycleFee = null,
  isManufacturingCountry = null,
  isRegionalRestricted = null,
  packagingLevel1 = null,
  isNews = null,
  isDiscontinued = null,
  isSupplierTemporaryNotAvailable = null,
  sugarContent = null,
  sugarContentGramPer100ml = null,
  seal = null,
  vintage = null,
  color = null,
  wineImage = null,
  usage = null,
) => query(
  'INSERT INTO systembolaget_wines(productId, '
    + 'productNumber, '
    + 'productNameBold, '
    + 'productNameThin, '
    + 'category, '
    + 'productNumberShort, '
    + 'producerName, '
    + 'supplierName, '
    + 'isKosher, '
    + 'bottleText, '
    + 'restrictedParcelQuantity, '
    + 'isOrganic, '
    + 'isSustainableChoice, '
    + 'isClimateSmartPackaging, '
    + 'isEthical, '
    + 'isWebLaunch, '
    + 'productLaunchDate, '
    + 'isCompletelyOutOfStock, '
    + 'isTemporaryOutOfStock, '
    + 'alcoholPercentage, '
    + 'volumeText, '
    + 'volume, '
    + 'price, '
    + 'country, '
    + 'originLevel1, '
    + 'originLevel2, '
    + 'categoryLevel1, '
    + 'categoryLevel2, '
    + 'categoryLevel3, '
    + 'categoryLevel4, '
    + 'customCategoryTitle, '
    + 'assortmentText, '
    + 'taste, '
    + 'tasteClockBitter, '
    + 'tasteClockFruitacid, '
    + 'tasteClockBody, '
    + 'tasteClockRoughness, '
    + 'tasteClockSweetness, '
    + 'tasteClockSmokiness, '
    + 'tasteClockCasque, '
    + 'assortment, '
    + 'recycleFee, '
    + 'isManufacturingCountry, '
    + 'isRegionalRestricted, '
    + 'packagingLevel1, '
    + 'isNews, '
    + 'isDiscontinued, '
    + 'isSupplierTemporaryNotAvailable, '
    + 'sugarContent, '
    + 'sugarContentGramPer100ml, '
    + 'seal, '
    + 'vintage, '
    + 'color, '
    + 'image, '
    + 'usageField) '
        + 'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '
        + '?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  [
    parseInt(productId, 10),
    productNumber,
    productNameBold,
    productNameThin,
    category,
    productNumberShort,
    producerName,
    supplierName,
    isKosher,
    bottleText,
    restrictedParcelQuantity,
    isOrganic,
    isSustainableChoice,
    isClimateSmartPackaging,
    isEthical,
    isWebLaunch,
    productLaunchDate,
    isCompletelyOutOfStock,
    isTemporaryOutOfStock,
    alcoholPercentage,
    volumeText,
    volume,
    price,
    country,
    originLevel1,
    originLevel2,
    categoryLevel1,
    categoryLevel2,
    categoryLevel3,
    categoryLevel4,
    customCategoryTitle,
    assortmentText,
    taste,
    tasteClockBitter,
    tasteClockFruitacid,
    tasteClockBody,
    tasteClockRoughness,
    tasteClockSweetness,
    tasteClockSmokiness,
    tasteClockCasque,
    assortment,
    recycleFee,
    isManufacturingCountry,
    isRegionalRestricted,
    packagingLevel1,
    isNews,
    isDiscontinued,
    isSupplierTemporaryNotAvailable,
    sugarContent,
    sugarContentGramPer100ml,
    seal,
    vintage,
    color,
    wineImage,
    usage,
  ],
)
  .then((cursor) => cursor[0].insertId)
  .catch((error) => {
    console.log(error);
  });

export const getSystembolagetWineById = (productId) => query(
  `SELECT * FROM systembolaget_wines WHERE productId = ${productId}; `,
)
  .then((cursor) => {
    if (cursor[0][0]) {
      return cursor[0][0];
    }
    return null;
  })
  .catch((error) => {
    console.log(error);
  });

export const updateSystembolagetWine = (image, productId) => query('UPDATE systembolaget_wines SET image = ? WHERE productId = ?', [
  image,
  productId,
]).catch((error) => {
  console.log(error);
});

export const insertSystembolagetWines = (wineArray) => {
  wineArray.forEach(async (wine) => {
    const {
      productId,
      productNumber,
      productNameBold,
      productNameThin,
      category,
      productNumberShort,
      producerName,
      supplierName,
      isKosher,
      bottleText,
      restrictedParcelQuantity,
      isOrganic,
      isSustainableChoice,
      isClimateSmartPackaging,
      isEthical,
      isWebLaunch,
      productLaunchDate,
      isCompletelyOutOfStock,
      isTemporaryOutOfStock,
      alcoholPercentage,
      volumeText,
      volume,
      price,
      country,
      originLevel1,
      originLevel2,
      categoryLevel1,
      categoryLevel2,
      categoryLevel3,
      categoryLevel4,
      customCategoryTitle,
      assortmentText,
      usage,
      taste,
      tasteSymbols,
      tasteClockBitter,
      tasteClockFruitacid,
      tasteClockBody,
      tasteClockRoughness,
      tasteClockSweetness,
      tasteClockSmokiness,
      tasteClockCasque,
      assortment,
      recycleFee,
      isManufacturingCountry,
      isRegionalRestricted,
      packagingLevel1,
      isNews,
      isDiscontinued,
      isSupplierTemporaryNotAvailable,
      sugarContent,
      sugarContentGramPer100ml,
      wineSeal,
      vintage,
      grapes,
      color,
      wineImage,
    } = wine;
    const alreadyInserted = await getSystembolagetWineById(productId);
    if (!alreadyInserted) {
      await insertSystembolagetWine(
        productId,
        productNumber,
        productNameBold,
        productNameThin,
        category,
        productNumberShort,
        producerName,
        supplierName,
        booleanAsTinyInt(isKosher),
        bottleText,
        restrictedParcelQuantity,
        booleanAsTinyInt(isOrganic),
        booleanAsTinyInt(isSustainableChoice),
        booleanAsTinyInt(isClimateSmartPackaging),
        booleanAsTinyInt(isEthical),
        booleanAsTinyInt(isWebLaunch),
        productLaunchDate,
        booleanAsTinyInt(isCompletelyOutOfStock),
        booleanAsTinyInt(isTemporaryOutOfStock),
        alcoholPercentage,
        volumeText,
        volume,
        price,
        country,
        originLevel1,
        originLevel2,
        categoryLevel1,
        categoryLevel2,
        categoryLevel3,
        categoryLevel4,
        customCategoryTitle,
        assortmentText,
        taste,
        tasteClockBitter,
        tasteClockFruitacid,
        tasteClockBody,
        tasteClockRoughness,
        tasteClockSweetness,
        tasteClockSmokiness,
        tasteClockCasque,
        assortment,
        recycleFee,
        booleanAsTinyInt(isManufacturingCountry),
        booleanAsTinyInt(isRegionalRestricted),
        packagingLevel1,
        booleanAsTinyInt(isNews),
        booleanAsTinyInt(isDiscontinued),
        booleanAsTinyInt(isSupplierTemporaryNotAvailable),
        sugarContent,
        sugarContentGramPer100ml,
        wineSeal,
        vintage,
        color,
        wineImage,
        usage,
      );
      grapes.forEach(async (grape) => {
        await insertSystembolagetGrape(productId, grape);
      });
      tasteSymbols.forEach(async (tasteSymbol) => {
        await insertSystembolagetTasteSymbol(productId, tasteSymbol);
      });
    } else if (!alreadyInserted?.image) {
      await updateSystembolagetWine(wineImage, productId);
    }
  });
};

const getSystembolagWinesQuery = async (statements) => query(
  `SELECT systembolaget_wines.* FROM systembolaget_wines WHERE ${statements.join(' AND ')} ; `,
)
  .then((cursor) => {
    if (cursor[0]) {
      return cursor[0];
    }
    return null;
  })
  .catch((e) => {
    console.log(e);
  });

export const getSystembolagWines = async (
  name,
  type,
  subType,
  country,
  price,
  vintage,
  description,
  volume,
  productId,
) => {
  const statements = [];
  if (name) {
    statements.push(
      ` (systembolaget_wines.productNameBold like '%${name}%' OR systembolaget_wines.productNameThin like '%${name}%') `,
    );
  }
  if (type) {
    statements.push(` systembolaget_wines.categoryLevel2 like '${type}' `);
  }
  if (subType) {
    statements.push(` systembolaget_wines.categoryLevel3 like '${subType}' `);
  }
  if (price) {
    statements.push(` systembolaget_wines.price like '${price}' `);
  }
  if (vintage) {
    statements.push(` systembolaget_wines.vintage like '${vintage}' `);
  }
  if (volume) {
    statements.push(` systembolaget_wines.volume like '${volume}' `);
  }
  if (description) {
    statements.push(
      ` (systembolaget_wines.taste like '%${description}%' OR systembolaget_wines.usageField like '%${description}%') `,
    );
  }
  if (productId) {
    statements.push(` systembolaget_wines.productCode like '${productId}' `);
  }
  if (country) {
    statements.push(` systembolaget_wines.country like '${country}' `);
  }

  return getSystembolagWinesQuery(statements);
};

export const getUnpopulatedImagesArray = () => query(
  `SELECT DISTINCT image 
      FROM systembolaget_wines 
      WHERE fk_image_blob_id IS NULL 
      LIMIT 500;`,
).then((cursor) => {
  if (cursor[0]) {
    return cursor[0];
  }
  return null;
});

export const getSystembolagSubTypes = () => query(
  `SELECT DISTINCT categoryLevel3
      FROM systembolaget_wines
      WHERE categoryLevel3 IS NOT NULL
      GROUP BY categoryLevel3
      ORDER BY COUNT(categoryLevel3) DESC;
      `,
).then((cursor) => {
  if (cursor[0]) {
    return cursor[0].map((entity) => ({
      name: entity.categoryLevel3,
      value: entity.categoryLevel3,
    }));
  }
  return null;
});

export const getSystembolagCountries = () => query(
  `SELECT DISTINCT country
          FROM systembolaget_wines
          WHERE country IS NOT NULL
          GROUP BY country
          ORDER BY COUNT(country) DESC;
          `,
).then((cursor) => {
  if (cursor[0]) {
    return cursor[0].map((entity) => ({
      name: entity.country,
      value: entity.country,
    }));
  }
  return null;
});

export const getSystembolagTypes = () => query(
  `SELECT DISTINCT categoryLevel2
      FROM systembolaget_wines 
      WHERE categoryLevel2 IS NOT NULL
      GROUP BY categoryLevel2
      ORDER BY COUNT(categoryLevel2) DESC;
      `,
).then((cursor) => {
  if (cursor[0]) {
    return cursor[0].map((entity) => ({
      name: entity.categoryLevel2,
      value: entity.categoryLevel2,
    }));
  }
  return null;
});

export const getDistinctFromWine = (property, value) => query(
  `SELECT distinct wine.${property} FROM wine WHERE wine.${property} like '${value}'`,
).then((cursor) => {
  if (cursor[0][0]) {
    return cursor[0];
  }
  return null;
});

export const getDistinctFromSystembolagetWines = (property, value) => query(
  `SELECT distinct systembolaget_wines.${property} FROM wine WHERE systembolaget_wines.${property} like '${value}'`,
).then((cursor) => {
  if (cursor[0][0]) {
    return cursor[0];
  }
  return null;
});

export const getDistinctFromGrapes = (value) => query(
  `SELECT distinct grapes.grape FROM grapes WHERE grapes.grape like '${value}';`,
).then((cursor) => {
  if (cursor[0][0]) {
    return cursor[0];
  }
  return null;
});

export const getUserByUsername = (username) => query(SQL`SELECT * FROM users WHERE users.username = ${username}`).then(
  (cursor) => {
    if (cursor[0][0]) {
      return cursor[0][0];
    }
    return null;
  },
);

export const getUuidByUser = (id) => query(`SELECT * FROM uuid WHERE fk_user_id = ${id}`).then((cursor) => {
  if (cursor[0][0]) {
    return cursor[0][0];
  }
  return null;
});

export const getUuidByUuid = (uuid) => query(SQL`SELECT * FROM uuid WHERE uuid like ${uuid}`).then((cursor) => {
  if (cursor[0][0]) {
    return cursor[0][0];
  }
  return null;
});

export const getHashByUsername = (username) => query(SQL`SELECT hash FROM users WHERE users.username = ${username}`).then(
  (cursor) => {
    if (cursor[0][0]) {
      return cursor[0][0].hash;
    }
    return null;
  },
);

export const getWineById = (id) => query(`SELECT * FROM wine WHERE wine.id = ${id}`).then((cursor) => {
  if (cursor[0][0]) {
    return cursor[0][0];
  }
  return null;
});

export const getGrapesByWine = (id) => query(`SELECT * FROM grapes WHERE grapes.fk_wine_id = ${id}`).then(
  (cursor) => {
    if (cursor[0]) {
      return cursor[0];
    }
    return null;
  },
);

export const getGrapesBySysWine = (id) => query(`SELECT grape FROM systembolaget_grapes WHERE systembolaget_grapes.fk_systembolaget_wine_id = ${id}`).then(
  (cursor) => {
    if (cursor[0]) {
      return cursor[0];
    }
    return null;
  },
).catch((error) => {
  console.log(error);
});

export const getTasteSymbolsBySysWine = (id) => query(`SELECT * FROM systembolaget_taste_symbols WHERE systembolaget_taste_symbols.fk_systembolaget_wine_id = ${id}`).then(
  (cursor) => {
    if (cursor[0]) {
      return cursor[0];
    }
    return null;
  },
).catch((error) => {
  console.log(error);
});

export const getReviewsByWine = (id) => query(`SELECT * FROM reviews WHERE reviews.fk_wine_id = ${id}`).then(
  (cursor) => {
    if (cursor[0]) {
      return cursor[0];
    }
    return null;
  },
);

export const getWineByForeignProperty = (table, property, value) => query(
  `SELECT wine.id FROM wine, ${table} WHERE ${table}.${property} like ? AND wine.id = ${table}.fk_wine_id`,
  [value],
).then((cursor) => {
  if (cursor[0]) {
    return cursor[0];
  }
  return null;
});

export const getWineByProperty = (property, value) => query(`SELECT wine.id FROM wine WHERE wine.${property} = ?`, [value]).then(
  (cursor) => {
    if (cursor[0]) {
      return cursor[0];
    }
    return null;
  },
);

export const getAllNotCellarWines = () => query('SELECT wine.id FROM wine').then((cursor) => {
  if (cursor[0]) {
    return cursor[0];
  }
  return null;
});

export const setUuidExpired = (uuid) => {
  query('UPDATE uuid SET uuid.ttl = 0 where uuid = ?', [uuid]);
};

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
  url = null,
) => query(
  'INSERT INTO wine(year, name, boughtfrom, price, container, country, type, producer, incellar, volume, nr, url, subType) '
      + 'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
  ],
).then((cursor) => cursor[0].insertId);

export const insertReview = (id, reviewer, comment, score) => query(
  'INSERT INTO reviews (fk_wine_id, reviewer, comment, score) VALUES(?, ?, ?, ?)',
  [id, reviewer, comment, score],
);

export const insertGrape = (id, grape) => {
  query('INSERT INTO grapes (fk_wine_id, grape) VALUES(?, ?)', [id, grape]);
};
export const insertUser = (username, hash, name) => {
  query('INSERT INTO users (username, hash, name) VALUES(?, ?, ?)', [
    username,
    hash,
    name,
  ]);
};

export const insertUuid = (userId, uuid, ttl, ttlMax) => {
  query(
    'INSERT INTO uuid (fk_user_id, uuid, ttl, ttl_max) VALUES(?, ?, ?, ?)',
    [userId, uuid, ttl, ttlMax],
  );
};

export const updateUuid = (id, uuid, ttl, ttlMax) => {
  query('UPDATE uuid SET uuid = ?, ttl = ?, ttl_max = ? WHERE fk_user_id = ?', [
    uuid,
    ttl,
    ttlMax,
    id,
  ]);
};

export const updateUuidTtl = (id, ttl) => {
  query('UPDATE uuid SET ttl = ? WHERE id = ?', [ttl, id]);
};
