const fs = require("fs").promises;
const path = require("path");
const { v4: id } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function withTryCatch(fn) {
  try {
    await fn();
  } catch (error) {
    console.error(error);
  }
}

async function listContacts() {
  withTryCatch(async () => {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    console.table(parsedContacts);
  });
}

async function getContactById(contactId) {
  withTryCatch(async () => {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    const contactById = parsedContacts.filter(({ id }) => id === contactId);

    if (contactById.length === 0) {
      console.log(`No contact was found with the ID '${contactId}'.`);
    } else {
      console.table(contactById);
    }
  });
}

async function removeContact(contactId) {
  withTryCatch(async () => {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    const newList = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );

    if (parsedContacts.length === newList.length) {
      console.log(`No contact was found with the ID '${contactId}' to remove.`);
    } else {
      await fs.writeFile(
        contactsPath,
        JSON.stringify(newList, null, "\t"),
        "utf8"
      );

      const contactsAfterRemove = await fs.readFile(contactsPath, "utf8");

      console.table(JSON.parse(contactsAfterRemove));
    }
  });
}

async function addContact(name, email, phone) {
  withTryCatch(async () => {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    const nameToFind = parsedContacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    const emailToFind = parsedContacts.find(
      (contact) => contact.email.toLowerCase() === email.toLowerCase()
    );
    const phoneToFind = parsedContacts.find(
      (contact) => contact.phone === phone
    );

    if (nameToFind) {
      console.log(`A contact with the name '${name}' already exists.`);
    } else if (emailToFind) {
      console.log(`A contact with the email '${email}' already exists.`);
    } else if (phoneToFind) {
      console.log(`A contact with the phone number '${phone}' already exists.`);
    } else {
      const newContact = { id: id(), name, email, phone };
      const newList = [...parsedContacts, newContact];

      await fs.writeFile(
        contactsPath,
        JSON.stringify(newList, null, "\t"),
        "utf8"
      );

      console.table(newList);
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};



// const fs = require("fs").promises;
// const path = require("path");
// const { v4: id } = require("uuid");

// const contactsPath = path.join(__dirname, "db", "contacts.json");

// async function listContacts() {
//   try {
//     const contacts = await fs.readFile(contactsPath, "utf8");
//     const parsedContacts = JSON.parse(contacts);

//     return console.table(parsedContacts);
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function getContactById(contactId) {
//   try {
//     const contacts = await fs.readFile(contactsPath, "utf8");
//     const parsedContacts = JSON.parse(contacts);

//     const contactById = parsedContacts.filter(({ id }) => id === contactId);

//     if (contactById.length === 0) {
//       console.log(`No contact was found with the ID '${contactId}'.`);
//     } else {
//       console.table(contactById);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function removeContact(contactId) {
//   try {
//     const contacts = await fs.readFile(contactsPath, "utf8");
//     const parsedContacts = JSON.parse(contacts);

//     const newList = parsedContacts.filter(
//       (contact) => contact.id !== contactId
//     );

//     if (parsedContacts.length === newList.length) {
//       console.log(`No contact was found with the ID '${contactId}' to remove.`);
//     } else {
//       await fs.writeFile(
//         contactsPath,
//         JSON.stringify(newList, null, "\t"),
//         "utf8"
//       );

//       const contactsAfterRemove = await fs.readFile(contactsPath, "utf8");

//       console.table(JSON.parse(contactsAfterRemove));
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function addContact(name, email, phone) {
//   const newContact = { id: id(), name, email, phone };

//   try {
//     const contacts = await fs.readFile(contactsPath, "utf8");
//     const parsedContacts = JSON.parse(contacts);

//     const nameToFind = parsedContacts.find(
//       (contact) => contact.name.toLowerCase() === name.toLowerCase()
//     );
//     const emailToFind = parsedContacts.find(
//       (contact) => contact.email.toLowerCase() === email.toLowerCase()
//     );
//     const phoneToFind = parsedContacts.find(
//       (contact) => contact.phone === phone
//     );

//     if (nameToFind) {
//       console.log(`A contact with the name '${name}' already exists.`);
//     } else if (emailToFind) {
//       console.log(`A contact with the email '${email}' already exists.`);
//     } else if (phoneToFind) {
//       console.log(`A contact with the phone number '${phone}' already exists.`);
//     } else {
//       const newList = [...parsedContacts, newContact];
//       await fs.writeFile(
//         contactsPath,
//         JSON.stringify(newList, null, "\t"),
//         "utf8"
//       );

//       console.table(newList);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
