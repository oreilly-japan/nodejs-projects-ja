import { createInterface } from "readline";
import { promisify } from "util";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readLineAsync = promisify(readline.question).bind(readline);

(async () => {
  try {
    const name = await readLineAsync("What is your name? ");
    console.log(`Hello, ${name}!`);
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    readline.close();
  }
})();
