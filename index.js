import puppeteer from "puppeteer";

const getQuotes = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewPort: null,
  });
  const page = await browser.newPage();
  await page.goto("http://quotes.toscrape.com/", {
    waitUntil:"domcontentloaded",
  });

  const quotes = await page.evaluate(() => {
    const quoteList = document.querySelectorAll(".quote");

    return Array.from(quoteList).map((quote) => {

      const text = quote.querySelector(".text").innerText;
      const author = quote.querySelector(".author").innerText;
      
      return { text,author};
    });
  });

  console.log(quotes);
await page.click(".pager > .next > a");
//   await browser.close();
};

getQuotes();
