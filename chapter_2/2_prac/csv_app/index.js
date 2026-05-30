import fs from "node:fs";
import prompt from "prompt";
import { createObjectCsvWriter } from "csv-writer";

const path = "./contacts.csv";
const fileExistsAndNotEmpty = fs.existsSync(path) && fs.statSync(path).size > 0;
const csvWriter = createObjectCsvWriter({
  path,
  append: fileExistsAndNotEmpty,
  header: [
    { id: "name", title: "NAME" },
    { id: "number", title: "NUMBER" },
    { id: "email", title: "EMAIL" },
    { id: "createdAt", title: "CREATED_AT" },
  ],
});

prompt.start();
prompt.message = "";

const emailRegex = /\S+@\S+\.\S+/;
const numberRegex = /^\d+$/;

class Person {
  constructor(name = "", number = "", email = "") {
    this.name = name;
    this.number = number;
    this.email = email;
    this.createdAt = new Date().toISOString();
  }
  async saveToCSV() {
    try {
      const { name, number, email, createdAt } = this;
      await csvWriter.writeRecords([{ name, number, email, createdAt }]);
      console.log(`${name} Saved!`);
    } catch (err) {
      console.error(err);
    }
  }
}

const promptWithValidation = async () => {
  const responses = await prompt.get([
    { name: "name", description: "Contact Name" },
    { name: "number", description: "Contact Number" },
    { name: "email", description: "Contact Email" },
  ]);

  if (!numberRegex.test(responses.number)) {
    console.error("Error: Phone number should contain only digits.");
    return promptWithValidation();
  }

  if (!emailRegex.test(responses.email)) {
    console.error("Error: Invalid email format.");
    return promptWithValidation();
  }

  return responses;
};

const startApp = async () => {
  const responses = await promptWithValidation();
  const person = new Person(responses.name, responses.number, responses.email);
  await person.saveToCSV();
  const { again } = await prompt.get([
    { name: "again", description: "Continue? [y to continue]" },
  ]);
  if (again.toLowerCase() === "y") await startApp();
};

startApp();
