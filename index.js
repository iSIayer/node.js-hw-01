const path = require("path");
const joinPath = path.join(__dirname, "contacts.js");
const contactsOperations = require(joinPath);
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contactsOperations.listContacts();
      console.table(list);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        console.log(`Контакт ${id} не знайдено!`);
        return;
      }
      console.log(contact);
      break;

    case "add":
      const addElem = await contactsOperations.addContact(name, email, phone);
      console.log(`Контакт ${addElem} був додний до листу`);
      break;

    case "remove":
      const removeItem = await contactsOperations.removeContact(id);
      if (!removeItem) {
        console.log(`Такого id = ${id} немае в листу контактiв`);
        return;
      }
      console.log(
        `Контакт ${removeItem.name} з id = ${id} був видалений з листу!`
      );
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
