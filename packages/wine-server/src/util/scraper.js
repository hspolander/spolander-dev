import cheerio from "cheerio";

const scrapeWineProperties = async (winesRawHtml) => {
  let wineArray = [];
  for (let index = 0; index < winesRawHtml.length; index++) {
    if (winesRawHtml[index]?.indexOf("hotjar") > 0) {
      winesRawHtml.splice(index, 1);
    }
  }
  for (let index = 0; index < winesRawHtml.length; index++) {
    if (index <= winesRawHtml[index]?.indexOf("covid-19") > 0) {
      winesRawHtml.splice(index, 1);
    }
  }
  for (let index = 0; index < winesRawHtml.length; index++) {
    if (winesRawHtml[index]?.indexOf("/alkoholfritt/") > 0) {
      winesRawHtml.splice(index, 1);
    }
  }

  winesRawHtml.forEach(async (wineRawHtml) => {
    let wine = {};
    const $ = await cheerio.load(wineRawHtml);
    wine.link = $("a").attr("href") || null;
    wine.image = $("a div:nth-child(1) > img").attr("src") || null;
    wine.name1 = $("a h3>span:nth-child(1)").text() || null;
    wine.name1 = wine.name1
      ? wine.name1.substring(0, wine.name1.length / 2)
      : null;
    wine.name2 = $("a h3>span:nth-child(2)>span").text() || null;
    let regex = /((.*)-(\d*))/;
    let matchProductCode = wine.link.match(regex);
    wine.productCode = matchProductCode[3];
    if (wine.name2) {
      wine.name2 = wine.name2.substring(0, wine.name2.length / 2);
      wine.name2 = wine.name2.trim();
      const name2Regex = RegExp(/\d\d\d\d$/);
      wine.year = name2Regex.test(wine.name2) ? wine.name2.slice(-4) : null;
    }
    wine.volume =
      $(
        "a > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)"
      ).text() || "";
    wine.country =
      $(
        "a > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2)"
      ).text() || "";
    wine.description =
      $(
        "a > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)"
      ).text() || "";
    wine.price =
      $(
        "a > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > span:nth-child(1)"
      ).text() || "";
    wine.type = $("a h4").text() || "";
    wine.type = wine.type.substring(0, wine.type.length / 2);
    const typeRegex = RegExp(/.*, .*/);
    wine.subType = typeRegex.test(wine.type)
      ? wine.type.slice(wine.type.indexOf(", ") + 2)
      : null;
    wine.type = wine.subType
      ? wine.type.slice(0, wine.type.indexOf(", "))
      : wine.type;
    wineArray.push(wine);
  });
  return wineArray;
};

module.exports = scrapeWineProperties;
