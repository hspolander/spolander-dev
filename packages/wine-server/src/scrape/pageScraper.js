import { insertSystembolagetWines } from '../controller/queries';

const scraperObject = {
  async scraper(browser, period) {
    const page = await browser.newPage();
    let wineResponses = [];

    const winesRawHtml = period === 'all'
      ? 'https://www.systembolaget.se/sok/?categoryLevel1=Vin'
      : 'https://www.systembolaget.se/sok/?categoryLevel1=Vin&newArrivalType=Nytt%20senaste%20månaden';

    page.on('response', async (response) => {
      if (response._url.indexOf('v1/productsearch') > 0) {
        const wineResponse = await Promise.resolve(response.json());
        wineResponses = [...wineResponses, ...wineResponse.products];
      }
    });
    await page.goto(winesRawHtml);
    const [age20] = await page.$x(
      "//button[contains(., 'Jag har fyllt 20 år')]",
    );
    if (age20) {
      await age20.click();
    }
    page.waitForTimeout(100);
    const [cookiePls] = await page.$x(
      "//button[contains(., 'Spara ovan gjorda val')]",
    );
    if (cookiePls) {
      await cookiePls.click();
    }
    page.waitForTimeout(100);

    const [letMeBrowse] = await page.$x(
      "//button[contains(., 'ta mig direkt till onlinebutiken')]",
    );
    if (letMeBrowse) {
      await letMeBrowse.click();
    }
    for (let pageIndex = 1; pageIndex < 1000; pageIndex += 1) {
      await page.$x("//button[contains(., 'Till sidans topp')]");
      await page.waitForTimeout(150);
      const [showMoreButton] = await page.$x(
        "//button[contains(., 'Visa fler')]",
      );
      if (showMoreButton) {
        await showMoreButton.click();
      } else {
        pageIndex = 1000;
      }
    }

    const wines = wineResponses.map((wine) => {
      console.log(wine);
      const {
        productNumber,
        productNameBold,
        productNameThin,
        categoryLevel2,
        categoryLevel3,
        taste,
        images,
        vintage,
        volumeText,
        price,
      } = wine;
      //  productCode, name1, name2(ej årtal), type(cat1 och cat2?),
      //  subType(cat3), description(taste), year, volume, price

      const getType = (type) => {
        switch (type) {
          case 'Vitt':
            return 'Vitt vin';
          case 'Rött':
            return 'Rött vin';
          case 'Rosé':
            return 'Rosévin';

          default:
            return '';
        }
      };
      const wineImage = images.length > 0 ? images[0].imageUrl : '';

      return {
        productCode: productNumber,
        name1: productNameBold,
        name2: productNameThin,
        type: getType(categoryLevel2),
        subType:
          categoryLevel3
          || 'Drycken finns i lager hos leverantör, inte hos Systembolaget. Den är inte provad av Systembolaget och därför visas ingen smakbeskrivning. Drycken kan finnas i butiker vid lokal efterfrågan.',
        description: taste,
        image: wineImage,
        year: vintage,
        volume: volumeText,
        price: `${price}:-`,
      };
    });

    insertSystembolagetWines(wines);
    await browser.close();
  },
};

module.exports = scraperObject;
