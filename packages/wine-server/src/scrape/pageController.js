const pageScraper = require("./pageScraper");

async function scrapeAll(browserInstance, period) {
  let browser;
  try {
    browser = await browserInstance;
    return await pageScraper.scraper(browser, period);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
    return err;
  }
}

module.exports = (browserInstance, period) =>
  scrapeAll(browserInstance, period);
