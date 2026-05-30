import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const subscriber = createClient({ url: redisUrl });
await subscriber.connect();
console.log("Inventory service connected to Redis.");

const inventory = { latte: 10, coffee: 10, cappuccino: 10 };

function resetInventory() {
  inventory.latte = 10;
  inventory.coffee = 10;
  inventory.cappuccino = 10;
  console.log("Inventory has been reset:", inventory);
}

setInterval(resetInventory, 5 * 60 * 1000);


// you can run code by `redis-cli PUBLISH drink-order '{"order":"latte","customer":"Alice"}'`
await subscriber.subscribe("drink-order", (message) => {
  const drinkOrder = JSON.parse(message);
  const drink = drinkOrder.order || drinkOrder;

  if (inventory[drink] !== undefined) {
    inventory[drink]--;
    console.log(`Order received: ${drink}. Stock remaining: ${inventory[drink]}`);

    if (inventory[drink] < 3) {
      console.log(`⚠ Low stock for ${drink}: ${inventory[drink]} remaining`);
    }
  } else {
    console.log(`Unknown drink ordered: ${drink}`);
  }
});

console.log("Listening for orders on 'drink-order' channel...");
