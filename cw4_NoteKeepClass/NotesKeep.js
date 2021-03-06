/* eslint-disable no-undef */
class NotesKeep {
    constructor(notesNode, addBtnNode, noteNode, searchFormNode) {
        this.noteNodeName = notesNode;
        this.addBtnNode = addBtnNode;
        this.noteNode = noteNode;
        this.searchFormNode = searchFormNode;
        this.notes = [];
        this.lsKey = 'notes';
        this.actualIdNumber = 1;
        this.LoadId();
        this.addBtnNode.addEventListener('click', () => this.NewNote());
        this.searchFormNode[1].addEventListener('click', (element) => this.ShowFilteredNotes(element, searchFormNode[0].value));
        this.ShowNotes(this.notes);
    }
    NewNote() {
        const newNote = new Note(this);
        newNote.NewNote(this);
        this.notes.push(newNote);
        this.SaveId();
        this.actualIdNumber++;
    }
    OpenNote(index) {
        const openNote = Note.LoadNote(this, this.notes[index]);
        openNote.OpenNote(this, index);
    }
    SaveNote() {
        localStorage.setItem(this.lsKey, JSON.stringify(this.notes));
    }
    SaveId() {
        localStorage.setItem('actualIdNumber', this.actualIdNumber);
    }
    LoadId() {
        if (localStorage.getItem('actualIdNumber') == null) return;
        this.actualIdNumber = localStorage.getItem('actualIdNumber');
        this.actualIdNumber++;
    }
    SortNotes() {
        const pinnedNotes = this.notes.filter((note) => note.isPinned);
        const unPinnedNotes = this.notes.filter((note) => !note.isPinned);
        const allNotes = pinnedNotes.concat(unPinnedNotes);
        this.notes.forEach((note, index) => {
            this.notes[index] = allNotes[index];
        });
    }
    ShowNotes(notes) {
        this.noteNodeName.textContent = '';
        this.UpdateNotesList();
        this.SortNotes();
        notes.forEach((note, index) => {
            const showNote = document.createElement('div');
            showNote.textContent = note.title;
            showNote.style.backgroundColor = this.notes[index].backgroundColor;
            showNote.style.color = this.notes[index].fontColor;
            if (note.isPinned) showNote.style.border = `.4vw solid ${note.fontColor}`;
            this.noteNodeName.appendChild(showNote);
            showNote.addEventListener('click', () => this.OpenNote(index));
        });
    }
    ShowFilteredNotes(element, input) {
        element.preventDefault();
        if (input == '') {
            this.ShowNotes(this.notes);
            return;
        }
        const filteredNotes = this.notes.filter((note) => {
            const tags = note.noteTags.filter((tag) => tag == input);
            if (note.id == input) return true;
            if (note.title == input) return true;
            if (note.message == input) return true;
            if (tags.length > 0) return true;
        });
        this.ShowNotes(filteredNotes);

    }
    UpdateNotesList() {
        if (JSON.parse(localStorage.getItem(this.lsKey)) == null) return;
        const lsValues = [...(JSON.parse(localStorage.getItem(this.lsKey)))];
        lsValues.forEach((lsValue, index) => {
            this.notes[index] = lsValue;
        });
    }
}