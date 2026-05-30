import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import Fastify from "fastify";

puppeteer.use(StealthPlugin());

const URL = "https://medium.com/tag/nodejs";
const KEYWORD = process.env.KEYWORD || process.argv[2] || "performance";
const PORT = 3000;

const scrapedArticles = [];

async function scrapeArticles() {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "networkidle2" });

    const articles = await page.$$('article[data-testid="post-preview"]');
    for (const article of articles) {
      const title = await article.$eval("h2", (el) => el.textContent?.trim() ?? "");
      const url = await article.$eval('div[role="link"]', (el) => el.getAttribute("data-href"));

      if (title.toLowerCase().includes(KEYWORD.toLowerCase())) {
        const entry = { title, url };
        scrapedArticles.push(entry);
        console.log(title, url);
      }
    }

    console.log(`\n${scrapedArticles.length} articles matched keyword "${KEYWORD}"`);
    await browser.close();
  } catch (e) {
    console.log("error", e.message);
  }
}

async function startServer() {
  const app = Fastify();

  app.get("/api/articles", async () => {
    return scrapedArticles;
  });

  await app.listen({ port: PORT, host: "0.0.0.0" });
  console.log(`Please access http://localhost:${PORT}/api/articles to see the scraped articles.`);
}

await scrapeArticles();
await startServer();
