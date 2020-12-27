import scrapeWineProperties from "../util/scraper";
import { insertSystembolagetWines } from "../controller/queries";

const scraperObject = {
  async scraper(browser, period) {
    let page = await browser.newPage();

    for (let pageIndex = 1; pageIndex < 1000; pageIndex++) {
      let winesRawHtml =
        period === "all"
          ? `https://www.systembolaget.se/sok/?categoryLevel1=Vin&categoryLevel2=Mousserande%20vin&page=${pageIndex}`
          : `https://www.systembolaget.se/sok/?categoryLevel1=Vin&newArrivalType=Nytt%20senaste%20månaden&page=${pageIndex}`;
      await page.goto(winesRawHtml);

      if (pageIndex === 1) {
        let [age20] = await page.$x(
          "//button[contains(., 'Jag har fyllt 20 år')]"
        );
        if (age20) {
          await age20.click();
        }
        page.waitForTimeout(100);
        let [cookiePls] = await page.$x(
          "//button[contains(., 'SPARA & STÄNG')]"
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

      await page.waitForSelector("#mainContent .container>.row");
      page.waitForTimeout(500);

      for (let index = 0; index < 70; index++) {
        await page.waitForTimeout(150).then(async () => {
          await page.mouse.wheel({ deltaY: 200 });
        });
      }

      page.waitForTimeout(300);

      let wines = await page.$$eval(
        ".container>.row div:nth-child(1)>div:nth-child(1)>a",
        () =>
          Array.from(
            document.querySelectorAll(
              ".container>.row div:nth-child(1)>div:nth-child(1)>a"
            )
          ).map((elem) => {
            return elem.outerHTML;
          })
      );

      let wineArray = new Object();
      wineArray = await scrapeWineProperties(wines);
      await insertSystembolagetWines(wineArray);
      const showMoreButton = await page.$x(
        "//button[contains(., 'Visa fler')]"
      );

      if (showMoreButton.length === 0) {
        pageIndex = 1000;
      }
    }
    await browser.close();
  },
};

module.exports = scraperObject;
