const {program} = require("commander");
const contacts = require("./contacts");

const invokeAction = async({action, id, name, email, phone}) => {
    switch(action){
        case "list":
            const allСontacts = await contacts.list();
            console.log(allСontacts);
            break;
        case "get":
            const oneBook = await contacts.get(id);
            console.log(oneBook);
            break;
        case "add":
            const newBook = await contacts.add({name, email, phone});
            console.log(newBook);
            break;
        case "remove":
            const removeBook = await contacts.remove(id);
            console.log(removeBook);
            break;
        default:
            console.log("\x1B[31m Unknown action type!");
    }
}

program
    .option("-a, --action <type>")
    .option("-i, --id <type>")
    .option("-n, --name <type>")
    .option("-em, --email <type>")
    .option("-ph, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options); 

