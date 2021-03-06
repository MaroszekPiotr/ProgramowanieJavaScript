class Note {
    constructor(notesKeepClass) {
        this.noteNode = notesKeepClass.noteNode;
        this.id = notesKeepClass.actualIdNumber;
        this.title;
        this.message;
        this.backgroundColor;
        this.fontColor;
        this.borderColor;
        this.isPinned;
        this.startDate;
        this.noteTags = [];
        this.reminderDate;
        this.reminderTime;
        this.noteColor;
    }
    static LoadNote(notesKeepClass, note) {
        const newNote = new Note(notesKeepClass);
        for (let property in note) {
            if (property === 'noteNode') continue;
            newNote[property] = note[property];
        }
        return newNote;
    }
    NewNote(notesKeepClass) {
        this.noteNode.classList.add('active');

        const noteTitleDiv = this.DivCreator(this.noteNode, 'title');
        const titleForm = this.FormCreator(noteTitleDiv);
        const noteTitle = this.InputCreator(titleForm, 'text', '', 'Wprowadź tytuł');

        const noteMessageDiv = this.DivCreator(this.noteNode, 'message');
        const noteContent = document.createElement('textarea');
        noteMessageDiv.appendChild(noteContent).classList.add('message');
        this.SetNoteColor(noteContent, 0);

        const noteMenuNote = this.DivCreator(this.noteNode, 'menuNote');
        const menuFormTag = this.TagCreator(noteMenuNote);
        menuFormTag.classList.add('formTag');

        const noteReminder = this.FormCreator(noteMenuNote);
        const noteReminderData = this.InputCreator(noteReminder, 'date', 'reminderDate');
        const noteReminderTime = this.InputCreator(noteReminder, 'time', 'reminderTime');
        this.LabelCreator(noteReminder, noteReminderData, 'przypomnienie');

        const notePinnedNote = this.FormCreator(noteMenuNote);
        const notePinnedValue = this.InputCreator(notePinnedNote, 'checkbox', 'pinnedNote');
        this.LabelCreator(notePinnedNote, 'pinnedNote', 'pinezka');

        const saveNote = () => {
            this.title = noteTitle.value;
            this.message = noteContent.value;
            this.backgroundColor;
            this.fontColor;
            this.borderColor;
            this.isPinned = notePinnedValue.checked;
            this.startDate = new Date();
            this.reminderDate = noteReminderData.value;
            this.reminderTime = noteReminderTime.value;
            this.ExitNote(this.noteNode);
            notesKeepClass.SaveNote();
            notesKeepClass.ShowNotes(notesKeepClass.notes);
        };
        this.ButtonCreator(noteMenuNote, 'anuluj', () => {
            notesKeepClass.notes.splice(notesKeepClass.notes.length - 1, 1);
            notesKeepClass.actualIdNumber--;
            this.ExitNote(this.noteNode);
        }, 'cancelNoteBtn');
        this.ButtonCreator(noteMenuNote, 'zapisz', saveNote, 'addNoteBtn');
    }
    OpenNote(notesKeepClass, index) {
        if (this.noteNode.classList.value === 'note active') return;
        const element = this;
        this.noteNode.classList.add('active');

        const noteTitleDiv = this.DivCreator(this.noteNode, 'title');
        noteTitleDiv.textContent = element.title;
        noteTitleDiv.classList.add('title', 'input');

        const noteMessageDiv = this.DivCreator(this.noteNode, 'message');
        noteMessageDiv.textContent = element.message;
        noteMessageDiv.classList.add('textarea');
        noteMessageDiv.style.backgroundColor = this.backgroundColor;
        noteMessageDiv.style.color = this.fontColor;

        const noteMenuNote = this.DivCreator(this.noteNode, 'menuNote');
        const menuFormTag = document.createElement('div');
        menuFormTag.classList.add('formTag');
        menuFormTag.textContent = this.noteTags ? `Tagi: ${this.noteTags}` : 'Tagi: brak';
        menuFormTag.classList.add('formElements');
        noteMenuNote.appendChild(menuFormTag);

        const noteReminder = document.createElement('div');
        noteReminder.textContent = this.reminderDate ? `przypomnienie: ${this.reminderDate}: ${this.reminderTime}` : 'brak przypomnienia';
        noteReminder.classList.add('formElements');
        noteMenuNote.appendChild(noteReminder);

        const notePinnedNote = document.createElement('div');
        notePinnedNote.textContent = this.isPinned ? 'wiadomość przypięta' : 'wiadomość nieprzypięta';
        notePinnedNote.classList.add('formElements');
        noteMenuNote.appendChild(notePinnedNote);

        this.ButtonCreator(noteMenuNote, 'usuń', () => {
            notesKeepClass.notes.splice(index, 1);
            this.ExitNote(this.noteNode);
            notesKeepClass.SaveNote();
            notesKeepClass.ShowNotes(notesKeepClass.notes);
        });
        this.ButtonCreator(noteMenuNote, 'powróć', () => this.ExitNote(this.noteNode));
    }
    ExitNote(noteNode) {
        noteNode.textContent = '';
        noteNode.classList.remove('active');
    }
    SetColor(colorSetNumber) {
        const noteColorSets = [{
            backgroundColor: '#272121',
            fontColor: '#f9d276'
        }, {
            backgroundColor: '#cf7500',
            fontColor: '#f4f4f4'
        }, {
            backgroundColor: '#07689f',
            fontColor: '#ffc93c'
        }, {
            backgroundColor: '#2d4059',
            fontColor: '#ea5455'
        }, {
            backgroundColor: '#fddb3a',
            fontColor: '#52575d'
        }, {
            backgroundColor: '#fadcac',
            fontColor: '#158467'
        }, {
            backgroundColor: '#206a5d',
            fontColor: '#81b214'
        }];
        if (colorSetNumber === 'array') return noteColorSets;
        return noteColorSets[colorSetNumber];
    }
    SetNoteColor(nodeName, defaultColorNo = 0) {
        const messageBox = document.querySelector('.message');
        const colorBox = document.createElement('div');
        colorBox.classList.add('setNoteColor');
        messageBox.appendChild(colorBox);
        this.noteColor = defaultColorNo;
        const noteColorSets = this.SetColor('array');
        this.backgroundColor = noteColorSets[defaultColorNo].backgroundColor;
        this.fontColor = noteColorSets[defaultColorNo].fontColor;
        const setNewColor = (index) => {
            this.noteColor = index;
            this.backgroundColor = noteColorSets[index].backgroundColor;
            nodeName.style.backgroundColor = this.backgroundColor;
            this.fontColor = noteColorSets[index].fontColor;
            nodeName.style.color = this.fontColor;
        };
        noteColorSets.forEach((color, index) => {
            const divColor = document.createElement('div');
            divColor.style.backgroundColor = color.backgroundColor;
            divColor.style.color = color.fontColor;
            if (index === 0) divColor.style.border = `${color.fontColor} solid 2px`;
            colorBox.appendChild(divColor);
            divColor.addEventListener('click', () => setNewColor(index));
        });
        return this.noteColor;
    }
    DivCreator(nodeName, className) {
        const div = document.createElement('div');
        div.classList.add(className);
        nodeName.appendChild(div);
        return div;
    }
    FormCreator(nodeName) {
        const form = document.createElement('form');
        nodeName.appendChild(form);
        return form;
    }
    InputCreator(nodeName, type, id, value) {
        const input = document.createElement('input');
        input.type = type;
        if (id) input.id = id;
        if (value) input.value = value;
        nodeName.appendChild(input);
        input.addEventListener('click', () => input.value = '');
        return input;
    }
    LabelCreator(nodeName, labelFor, labelContent) {
        const label = document.createElement('label');
        label.for = labelFor;
        label.textContent = labelContent;
        nodeName.appendChild(label);
        return label;
    }
    TagCreator(nodeName) {
        const form = this.FormCreator(nodeName);
        const inputs = this.InputCreator(form, 'text', 'noteTagsInput', 'wpisz tagi oddzielając je spacją');
        let inputFlag = 0;
        const addTagToNote = (element) => {
            element.preventDefault();
            this.noteTags.push([(inputs.value).split(' ')]);
            inputs.value = '';
        };
        this.ButtonCreator(form, 'dodaj', addTagToNote);
        inputs.addEventListener('click', () => inputFlag++ ? '' : inputs.value = '');
        return form;
    }
    ButtonCreator(nodeName, buttonValue, listenerFunctionName, buttonId) {
        const btn = document.createElement('button');
        btn.id = buttonId;
        btn.textContent = buttonValue;
        nodeName.appendChild(btn);
        btn.addEventListener('click', listenerFunctionName);
        return btn;
    }
}