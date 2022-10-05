// const { nanoid } = require("nanoid");
const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "db/contacts.json");

//  функции для работы с коллекцией контактов:

async function listContacts() {
  const response = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(response);
  return contactsList;
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const resultSearchId = contactsList.some((elem) => elem.id === contactId);
  if (!resultSearchId) {
    return null;
  }
  return resultSearchId;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((elem) => elem.id === contactId);
  if (index === -1) {
    return null;
  }

  const removedElem = contactsList[index];
  contactsList.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return removedElem;
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const newContact = { id: nanoid(), name: name, email: email, phone: phone };
  contactsList.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contactsList));
  console.log(`Додали новий контакт ${name}`);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
