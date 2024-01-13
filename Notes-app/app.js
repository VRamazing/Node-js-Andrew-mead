const chalk = require("chalk");
const yargs = require("yargs");
const { listNotes, addNote, removeNote, readNote }   = require("./notes.js");

//set yargs version
yargs.version('1.1.0');

// add command
yargs.command({
    command: "add",
    describe: "Add a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => addNote(argv.title, argv.body) 
})

// Remove command
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => removeNote(argv.title)
})

//list command
yargs.command({
    command: "list",
    describe: "List notes",
    handler: () => listNotes()
})

//read command
yargs.command({
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => readNote(argv.title)
})

yargs.parse();