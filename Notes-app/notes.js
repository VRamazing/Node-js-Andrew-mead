const fs = require("fs");
const chalk = require("chalk");

const listNotes = () => {
    const noteList = loadNotes();
    console.log(chalk.inverse(`Here are your notes`));
    noteList.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
    const noteList = loadNotes();
    const noteFound = noteList.find((note) => note.title === title);
    if(noteFound){
        console.log(chalk.inverse(noteFound.title));
        console.log(noteFound.body)
    } else {
        console.log(chalk.bgRed(`Note with title ${title} not found`));
    }

}


const addNote = (title, body) => {
    debugger;

    const noteList = loadNotes();
    // Dont add new note if note of same title is present.
    const duplicateNotes = noteList.filter((note) => note.title === title);
    if(duplicateNotes.length > 0){
        console.log(chalk.bgRed(`Note with title ${title} already present.`))
    } else {
        const currentNote = { title, body }
        noteList.push(currentNote);
        saveNotes(noteList)
        console.log(chalk.bgGreen(`Note with title ${title} added.`));
    }
}

const removeNote = (title) => {
    const noteList = loadNotes();
    const removedNoteFromNotes = noteList.filter((note) => note.title !== title);

    // checking if note present
    if(removedNoteFromNotes.length === noteList.length){
        console.log(chalk.bgRed(`Note with title ${title} not present`))
    } else {
        saveNotes(removedNoteFromNotes);
        console.log(chalk.bgGreen(`Note with title ${title} removed.`));
    }
}

const loadNotes = () => {
    try{
        const noteListBuffer = fs.readFileSync("notes.json");
        const notesJSON = noteListBuffer.toString();
        return JSON.parse(notesJSON);
    }
    catch(e){
        // returning empty list when no file created
        return [];
    }
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", notesJSON);
}

module.exports = {
    listNotes,
    addNote,
    removeNote,
    readNote
}