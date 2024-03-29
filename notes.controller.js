const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
    const notes = await getNotes();

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

   await fs.writeFile(notesPath, JSON.stringify(notes));
   console.log(chalk.green.inverse('Note was added'))
};

async function printNotes() {
    const notes = await getNotes();

    console.log(chalk.bgBlue('Here is the list of notes:'));
    notes.forEach(note => {
        console.log(chalk.blue(note.id, note.title));
    });

}

async function removeNotes(id) {
    const notes = await getNotes();
    notes.map((note, ind) => {
        id === Number(note.id) ? notes.splice(ind, 1) : console.log('not found id')
    });
    await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
};

module.exports = {
    addNote, printNotes, removeNotes
}