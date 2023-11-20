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

    this.$activeForm = document.querySelector(".active-form");
    this.$inactiveForm = document.querySelector(".inactive-form");
    this.$noteTitle = document.querySelector("#note-title");
    this.$noteText = document.querySelector("#note-text");
    this.$notes = document.querySelector(".notes");
    this.$form = document.querySelector("#form");

    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener("click", (event) => {
      this.handleFormClick(event);
    });

    this.$form.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = this.$noteTitle.value;
      const text = this.$noteText.value;
      this.addNote({ title, text });
      this.closeActiveForm();
    });
  }

  handleFormClick(event) {
    const isActiveFormClickedOn = this.$activeForm.contains(event.target);
    const isInActiveFormClickedOn = this.$inactiveForm.contains(event.target);
    const title = this.$noteTitle.value;
    const text = this.$noteText.value;

    if (isInActiveFormClickedOn) {
      this.openActiveForm();
    } else if (!isInActiveFormClickedOn && !isActiveFormClickedOn) {
      this.addNote({ title, text });
      this.closeActiveForm();
    }
  }

  openActiveForm() {
    this.$inactiveForm.style.display = "none";
    this.$activeForm.style.display = "block";
    this.$noteText.focus();
  }
  closeActiveForm() {
    this.$inactiveForm.style.display = "block";
    this.$activeForm.style.display = "none";
    this.$noteText.value = "";
    this.$noteTitle.value = "";
  }

  addNote(id, { title, text }) {
    if (text != "") {
      const newNote = new Note(cuid(), title, text);
      this.notes = [...this.notes, newNote];
      this.displayNotes();
    }
  }

  editNote(id, { title, text }) {
    this.notes = this.notes.map((note) => {
      if (note.id == id) {
        note.title = title;
        note.text = text;
      }
      return note;
    });
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id != id);
  }

  displayNotes() {
    this.$notes.innerHTML = this.notes
      .map(
        (note) =>
          `
    <div class="note" id="${note.id}">
        <span class="material-symbols-outlined">check_circle</span>
        <div class="title">${note.title}</div>
        <div class="text">${note.text}</div>
        <div class="note-footer"><div class="tooltip">
            <span class="material-symbols-outlined hover small-icon">add_alert</span>
            <span class="tooltip-text">Remind me</span>
        </div>
        <div class="tooltip">
            <span class="material-symbols-outlined hover small-icon">person_add</span>
            <span class="tooltip-text">Collaborator</span>
        </div>
        <div class="tooltip">
            <span class="material-symbols-outlined hover small-icon">palette</span>
            <span class="tooltip-text">Change colour</span>
        </div>
        <div class="tooltip">
            <span class="material-symbols-outlined hover small-icon">image</span>
            <span class="tooltip-text">Add image</span>
        </div>
        <div class="tooltip">
            <span class="material-symbols-outlined hover small-icon">archive</span>
            <span class="tooltip-text">Archive</span>
        </div>
        <div class="tooltip">
            <span class="material-symbols-outlined hover small-icon">more_vert</span>
            <span class="tooltip-text">New Image</span>
        </div>
        <div class="tooltip">
            <span class="material-symbols-outlined hover small-icon">undo</span>
            <span class="tooltip-text">Undo</span>
        </div>
        <div class="tooltip">
            <span class="material-symbols-outlined hover small-icon">redo</span>
            <span class="tooltip-text">Redo</span>
        </div>
        </div>
    </div>       
        `
      )
      .join(" ");
  }
}

const app = new App();
