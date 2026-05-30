import Parser from "rss-parser";
import promptModule from "prompt-sync";

const customItems = [];
const prompt = promptModule({ sigint: true });
const parser = new Parser();

const urls = [
  "https://www.bonappetit.com/feed/recipes-rss-feed/rss",
  "https://www.budgetbytes.com/category/recipes/feed/",
];

const keyword = prompt("Enter a keyword to filter feed items: ");

const main = async () => {
  const feedItems = [];
  const awaitableRequests = urls.map((url) => parser.parseURL(url));
  const responses = await Promise.all(awaitableRequests);
  aggregate(responses, feedItems);
  print(feedItems);
};

const aggregate = (responses, feedItems) => {
  for (let { items } of responses) {
    for (let { title, link, pubDate } of items) {
      if (title.toLowerCase().includes(keyword.toLowerCase())) {
        feedItems.push({ title, link, pubDate });
      }
    }
  }
  return feedItems;
};

const formatAge = (pubDate) => {
  if (!pubDate) return "Unknown";
  const publishedAt = new Date(pubDate);
  if (isNaN(publishedAt.getTime())) return "Unknown";
  const diffMs = Date.now() - publishedAt.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  return `${diffHours} hours ago`;
};

const print = (feedItems) => {
  const res = prompt("Add item: ");
  const [title, link] = res.split(",");
  if (![title, link].includes(undefined)) customItems.push({ title, link });
  console.clear();
  const displayItems = feedItems.concat(customItems).map((item) => ({
    title: item.title,
    link: item.link,
    Age: formatAge(item.pubDate),
  }));
  console.table(displayItems);
  console.log("Last updated ", new Date().toUTCString());
};

setInterval(main, 2000);
