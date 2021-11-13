import puppeteer from 'puppeteer';

async function startBrowser() {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true,
      headless: true,
    });
  } catch (err) {
    console.log('Could not create a browser instance => : ', err);
  }
  return browser;
}

module.exports = {
  startBrowser,
};
