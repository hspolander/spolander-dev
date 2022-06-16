import { insertSystembolagetWines } from '../controller/queries';

const scraperObject = {
  async scraper(browser, params) {
    const page = await browser.newPage();
    let wineResponses = [];
    const winesRawHtml = params
      ? `https://www.systembolaget.se/sok/?${params}`
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
        ethicalLabel,
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
        tasteClockGroupBitter,
        tasteClockGroupSmokiness,
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
        images,
        isDiscontinued,
        isSupplierTemporaryNotAvailable,
        sugarContent,
        sugarContentGramPer100ml,
        seal,
        vintage,
        grapes,
        otherSelections,
        tasteClocks,
        color,
        dishPoints,
      } = wine;
      const wineImage = images.length > 0 ? images[0].imageUrl : '';
      const wineSeal = seal.length > 0 ? seal.join('') : '';

      return {
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
        ethicalLabel,
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
        tasteClockGroupBitter,
        tasteClockGroupSmokiness,
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
        otherSelections,
        tasteClocks,
        color,
        dishPoints,
        wineImage,
      };
    });
    console.log(wines.length);

    insertSystembolagetWines(wines);
    await browser.close();
  },
};

module.exports = scraperObject;
