import Fastify from "fastify";
import formbody from "@fastify/formbody";
import amqp from "amqplib";

const app = Fastify();
await app.register(formbody);
const PORT = 3001;
let channel, connection;


// after starting the app by `node index`, run the following command in another terminal.Buffer
// `node -e "
//   import amqp from 'amqplib';
//   const conn = await amqp.connect('amqp://localhost:5672');
//   const ch = await conn.createChannel();
//   await ch.assertQueue('drink-order');
//   for (let i = 1; i <= 6; i++) {
//     const msg = { order: 'latte', customer: 'Customer' + i, retries: 0 };
//     ch.sendToQueue('drink-order', Buffer.from(JSON.stringify(msg)));
//     console.log('Sent order ' + i);
//   }
//   setTimeout(() => conn.close(), 500);
//   " --input-type=module`
await app.listen({ port: PORT, host: "0.0.0.0" });
console.log("Server running at http://localhost:" + PORT);

async function connect() {
  try {
    const rabbitHost = process.env.RABBITMQ_HOST || "localhost";
    connection = await amqp.connect(`amqp://${rabbitHost}:5672`);
    channel = await connection.createChannel();
    await channel.assertQueue("drink-order");
    await channel.assertQueue("analytics");
  } catch (err) {
    console.error(err);
  }
}

await connect();

let orderCount = 0;

async function sendOrderData(data) {
  await channel.sendToQueue("analytics", Buffer.from(JSON.stringify(data)));
}

channel.consume("drink-order", async (data) => {
  const { content } = data;
  const message = JSON.parse(content.toString());
  const { order, customer } = message;
  const retries = message.retries || 0;

  orderCount++;

  if (orderCount % 3 === 0) {
    console.log(
      `Order #${orderCount} failed for ${customer} (${order}). Requeuing... (retries: ${retries})`
    );
    channel.nack(data, false, true);
    return;
  }

  console.log(`Order #${orderCount}: ${order} being fulfilled for ${customer}`);
  channel.ack(data);
  await sendOrderData({ order, customer });
});
