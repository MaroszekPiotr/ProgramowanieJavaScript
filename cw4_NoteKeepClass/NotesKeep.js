class NotesKeep {
    constructor(notesNode, addBtnNode, noteNode, searchFormNode) {
        this.noteNodeName = notesNode;
        this.addBtnNode = addBtnNode;
        this.noteNode = noteNode;
        this.searchFormNode = searchFormNode;
        this.notes = [];
        this.lsKey = 'notes';
        this.addBtnNode.addEventListener('click', () => this.NewNote());

    }
    NewNote() {
        const newNote = new Note(this);
        newNote.NewNote(this);
        //this.notes.push(newNote);
    }
    OpenNote(index) {
        //if (this.noteList.classList.value === 'note active') return;
        //const noteElement = this.notes[index];
    }
    SaveNote() {
        localStorage.setItem(this.lsKey, JSON.stringify(this.notes));
    }
    ExitNote() {

    }
    SortNotes() {
        const pinnedNotes = this.notes.filter((note) => note.isPinned);
        const unPinnedNotes = this.notes.filter((note) => !note.isPinned);
        const allNotes = pinnedNotes.concat(unPinnedNotes);
        this.notes.forEach((note, index) => {
            note = allNotes[index];
        });
    }
    ShowNotes() {
        this.noteNodeName.textContent = '';
        this.UpdateNotesList();
        this.SortNotes();
        this.notes.forEach((note, index) => {
            const showNote = document.createElement('div');
            showNote.textContent = note.title;
            showNote.style.backgroundColor = this.notes[index].backgroundColor;
            showNote.style.color = this.notes[index].fontColor;
            //if (note.isPinned) showNote.style.border = `.4vw solid ${note.noteColor.fontColor}`;
            this.noteNodeName.appendChild(showNote);
            showNote.addEventListener('click', () => this.OpenNote(index));
        });
    }
    UpdateNotesList() {
        if (JSON.parse(localStorage.getItem(this.lsKey)) == null) return;
        const lsValues = [...(JSON.parse(localStorage.getItem(this.lsKey)))];
        lsValues.forEach((lsValue, index) => {
            this.notes[index] = lsValue;
        });
    }
}

const userNotesNodeName = document.querySelector('.userNotes');
const addBtn = document.querySelector('#addBtn');
const searchForm = document.querySelector('searchForm');
const noteNode = document.querySelector('.note');
const notesKeep = new NotesKeep(userNotesNodeName, addBtn, noteNode, searchForm);

const example = new Note(notesKeep);