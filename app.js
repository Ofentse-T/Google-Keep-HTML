class Note {
    constructor(id, title, text) {
        this.id = id;
        this.title = title;
        this.text = text;
    }
}

class App {
    constructor() {
        this.notes = [];
    }

    addNote(id, {title, text}) {
        const newNote = new Note(id, title, text);
        this.notes = [...this.notes, newNote];
    }

    editNote(id, {title, text }) {
        this.notes = this.notes.map((note) => {
            if (note.id == id) {
                note.title = title;
                note.text = text;
            }
        })
    }
}