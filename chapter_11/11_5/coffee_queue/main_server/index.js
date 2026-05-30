import Fastify from "fastify";
import formbody from "@fastify/formbody";
import amqp from "amqplib";

const app = Fastify();
await app.register(formbody);
const PORT = 3000;
let channel, connection;

async function connect() {
  try {
    const rabbitHost = process.env.RABBITMQ_HOST || "localhost";
    connection = await amqp.connect(`amqp://${rabbitHost}:5672`);
    channel = await connection.createChannel();
    await channel.assertQueue("drink-order");
    console.log("Main app connected to RabbitMQ");
  } catch (err) {
    console.error("RabbitMQ connection failed:", err);
  }
}

await connect();

async function sendOrderData(data) {
  await channel.sendToQueue("drink-order", Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });
}

app.post("/order", async (request, reply) => {
  const { drinkOrder: order, cost, customer } = request.body;
  const data = { order, customer };
  await sendOrderData(data);
  console.log(`Drink: ${order} is being processed for ${customer}`);
  reply.send("Order Processing");
});

await app.listen({ port: PORT, host: "0.0.0.0" });
console.log("Server running at http://localhost:" + PORT);
