import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

const publisher = createClient({ url: redisUrl });
const subscriber = createClient({ url: redisUrl });

await publisher.connect();
await subscriber.connect();

await subscriber.subscribe("orders", (message) => {
  console.log(`Received order: ${message}`);
});

await publisher.publish("orders", "latte");

await new Promise((resolve) => setTimeout(resolve, 100));

await publisher.quit();
await subscriber.quit();
