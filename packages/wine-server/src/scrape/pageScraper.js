import scrapeWineProperties from "../util/scraper";
import { insertSystembolagetWines } from "../controller/queries";

const scraperObject = {
  async scraper(browser, period) {
    let page = await browser.newPage();
    let wines = []
    let parsedWines = []

    let winesRawHtml =
    period === "all"
    ? `https://www.systembolaget.se/sok/?categoryLevel1=Vin`
    : `https://www.systembolaget.se/sok/?categoryLevel1=Vin&newArrivalType=Nytt%20senaste%20månaden`;
    
    page.on('response', async response => {
      if (response._url.indexOf('v1/productsearch') > 0) {
        let responseJson = await Promise.resolve(response.json())
        responseJson.forEach(wine => {
          let {productNumber, productNameBold, productNameThin, categoryLevel1, categoryLevel2, categoryLevel3, taste, image, vintage, volumeText, price} = wine
          /////productCode, name1, name2(ej årtal), type(cat1 och cat2?), subType(cat3), description(taste), year, volume, price
          let type = categoryLevel2 === 'Vitt' ? 'Vitt vin' : categoryLevel2 === 'Rött' ? 'Rött vin' : categoryLevel2 === 'Rosé' ? 'Rosévin' : categoryLevel2
          let wineImage = image.length > 0 ? image[0] : ''
          //wines = [...wines, {productCode: productNumber, name1: productNameBold, name2: productNameThin, type, subType: categoryLevel3, description: taste, image: wineImage, year: vintage, volume: volumeText, price } ]
        });
        wines = [...wines, ...responseJson.products]
      }
    });
    await page.goto(winesRawHtml);
    
    for (let pageIndex = 1; pageIndex < 1000; pageIndex++) {
      if (pageIndex === 1) {
        let [age20] = await page.$x(
          "//button[contains(., 'Jag har fyllt 20 år')]"
        );
        if (age20) {
          await age20.click();
        }
        page.waitForTimeout(100);
        let [cookiePls] = await page.$x(
          "//button[contains(., 'Spara ovan gjorda val')]"
        );
        if (cookiePls) {
          await cookiePls.click();
        }
        page.waitForTimeout(100);

        let [letMeBrowse] = await page.$x(
          "//button[contains(., 'ta mig direkt till onlinebutiken')]"
        );
        if (letMeBrowse) {
          await letMeBrowse.click();
        }
      }

      await page.$x(
        "//button[contains(., 'Till sidans topp')]"
      );

        let [showMoreButton] = await page.$x(
          "//button[contains(., 'Visa fler')]"
        );
        if (showMoreButton) {
          await showMoreButton.click();
        } else {
          console.log(wines)
          pageIndex = 1000;
        }

    }
    
    console.log(wines)
    //insertSystembolagetWines(wines)
    await browser.close();
  },
};

module.exports = scraperObject;
