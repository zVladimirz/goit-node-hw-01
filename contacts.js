const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async(contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const list = async()=> {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
}

const get = async(id)=> {
    const contacts = await list();
    const result = contacts.find(item => item.id === id);
    return result || null;
}

const add = async({name, email, phone}) => {
    const contacts = await list();

    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };

    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

const remove = async (id)=> {
    const contacts = await list();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}

module.exports = {
    list,
    get,
    add,
    remove,
}

