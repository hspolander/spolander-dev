import { insertSystembolagetWines } from '../controller/queries';

const scraperObject = {
  async scraper(browser, period) {
    const page = await browser.newPage();
    let winePromises = [];

    const winesRawHtml = period === 'all'
      ? 'https://www.systembolaget.se/sok/?categoryLevel1=Vin'
      : 'https://www.systembolaget.se/sok/?categoryLevel1=Vin&newArrivalType=Nytt%20senaste%20månaden';

    page.on('response', async (response) => {
      if (response._url.indexOf('v1/productsearch') > 0) {
        winePromises = [...winePromises, response];
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

      const [showMoreButton] = await page.$x(
        "//button[contains(., 'Visa fler')]",
      );
      if (showMoreButton) {
        await showMoreButton.click();
      } else {
        pageIndex = 1000;
      }
    }
    const responseJson = await Promise.all(winePromises.json());
    console.log(responseJson);
    // responseJson.forEach((wine) => {
    //   const {
    //     productNumber,
    //     productNameBold,
    //     productNameThin,
    //     categoryLevel1,
    //     categoryLevel2,
    //     categoryLevel3,
    //     taste,
    //     image,
    //     vintage,
    //     volumeText,
    //     price,
    //   } = wine;
    //  productCode, name1, name2(ej årtal), type(cat1 och cat2?),
    //  subType(cat3), description(taste), year, volume, price

    //   const type = categoryLevel2 === 'Vitt'
    //     ? 'Vitt vin'
    //     : categoryLevel2 === 'Rött'
    //       ? 'Rött vin'
    //       : categoryLevel2 === 'Rosé'
    //         ? 'Rosévin'
    //         : categoryLevel2;
    //   const wineImage = image.length > 0 ? image[0] : '';
    //   wines = [
    //     ...wines,
    //     {
    //       productCode: productNumber,
    //       name1: productNameBold,
    //       name2: productNameThin,
    //       type,
    //       subType: categoryLevel3,
    //       description: taste,
    //       image: wineImage,
    //       year: vintage,
    //       volume: volumeText,
    //       price,
    //     },
    //   ];
    // });

    // insertSystembolagetWines(wines)
    await browser.close();
  },
};

module.exports = scraperObject;
