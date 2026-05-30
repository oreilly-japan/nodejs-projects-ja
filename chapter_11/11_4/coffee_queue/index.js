import Fastify from "fastify";
import formbody from "@fastify/formbody";
import { createClient } from "redis";

const app = Fastify();
const PORT = process.env.PORT || 3000;

await app.register(formbody);

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

const subscriber = createClient({ url: redisUrl });
await subscriber.connect();

const publisher = createClient({ url: redisUrl });
await publisher.connect();

await subscriber.subscribe("drink-order", (drinkOrder) => {
  console.log(`Received a new ${drinkOrder} order.`);
});
// await subscriber.subscribe("drink-order", (message) => {
//   const parsed = JSON.parse(message);
//   console.log(`Received ${parsed.drink} for ${parsed.customer}`);
// });

app.post("/order", async (request, reply) => {
  const { drinkOrder } = request.body;
  await publisher.publish("drink-order", drinkOrder);
  // await publisher.publish("drink-order", JSON.stringify({
  //   drink: "latte",
  //   cost: 450,
  //   customer: "Jon Wexler"
  // }));
  reply.send(`Drink order published: ${drinkOrder}`);
});

await app.listen({ port: PORT, host: "0.0.0.0" });
console.log(`Server listening on http://localhost:${PORT}`);
