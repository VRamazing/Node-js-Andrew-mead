const {name, add} = require("./utils.js");
const getNotes = require("./notes.js");
const validator = require("validator");
const fs = require("fs");
const log = console.log;

const chalk  = require('chalk');

fs.writeFileSync(
    'notes.txt',
    'hi node js'
)

fs.appendFileSync(
    'notes.txt',
    'lets go'
)

log(chalk.green.bold.bgWhite.inverse('Chalk success!'));

console.log("Writing completed");
console.log(name);
console.log(add(4,2));
console.log(getNotes());
console.log(validator.isEmail('foo.com'));
console.log(validator.isURL('http://foo.in'));

