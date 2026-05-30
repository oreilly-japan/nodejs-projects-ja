import Fastify from "fastify";
import formbody from "@fastify/formbody";
import amqp from "amqplib";

const app = Fastify();
await app.register(formbody);
const PORT = 3002;
let channel, connection;

await app.listen({ port: PORT, host: "0.0.0.0" });
console.log("Server running at http://localhost:" + PORT);

async function connect() {
  try {
    const rabbitHost = process.env.RABBITMQ_HOST || "localhost";
    connection = await amqp.connect(`amqp://${rabbitHost}:5672`);
    channel = await connection.createChannel();
    await channel.assertQueue("analytics");
  } catch (err) {
    console.error(err);
  }
}

await connect();

const drinkMap = { latte: 0, coffee: 0, cappuccino: 0 };

channel.consume("analytics", (data) => {
  const { content } = data;
  const { order, customer } = JSON.parse(content.toString());
  if (drinkMap[order] !== undefined) {
    drinkMap[order]++;
  }
  console.log(`${order} being analyzed for ${customer}`);
  channel.ack(data);
});

function processDrinkAnalytics() {
  const FIVE_MINUTES_IN_MILLISECONDS = 5 * 60 * 1000;
  const TEN_SECONDS_IN_MILLISECONDS = 10000;

  setInterval(() => {
    const drinkNames = Object.keys(drinkMap);
    const totalDrinkCount = drinkNames.reduce((total, drinkName) => {
      return total + drinkMap[drinkName];
    }, 0);

    const drinkPercentages = drinkNames.map((drinkName) => {
      const percentage =
        Math.floor((drinkMap[drinkName] / totalDrinkCount) * 100) || 0;
      return ` ${drinkName}: ${percentage}%`;
    });

    console.log(`Drink orders: ${drinkPercentages}`);

    setTimeout(() => {
      drinkNames.forEach((drinkName) => {
        drinkMap[drinkName] = 0;
      });
    }, FIVE_MINUTES_IN_MILLISECONDS);
  }, TEN_SECONDS_IN_MILLISECONDS);
}

processDrinkAnalytics();
