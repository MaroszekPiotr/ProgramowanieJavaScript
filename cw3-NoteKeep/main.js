const notes = [];
const lsKey = 'notes';
const noteList = document.querySelector('.note');
const addBtn = document.querySelector('#addBtn');
const noteColorSets = [{backgroundColor: '#272121', fontColor: '#f9d276'},{backgroundColor: '#cf7500', fontColor: '#f4f4f4'},{backgroundColor: '#07689f', fontColor: '#ffc93c'},{backgroundColor: '#2d4059', fontColor: '#ea5455'},{backgroundColor: '#fddb3a', fontColor: '#52575d'},{backgroundColor: '#fadcac', fontColor: '#158467'},{backgroundColor: '#206a5d', fontColor: '#81b214'}];
let noteColor;
let noteTags;


const buttonCreator = (nodeName, buttonValue, listenerFunctionName, buttonId)=>{
    const btn = document.createElement('button');
    btn.id = buttonId;
    btn.textContent=buttonValue;
    nodeName.appendChild(btn);
    btn.addEventListener('click', listenerFunctionName);
    return btn;
};

const divCreator = (nodeName, className) =>{
    const div = document.createElement('div');
    div.classList.add(className);
    nodeName.appendChild(div);
    return div;
};

const inputCreator = (nodeName,type,id,value)=>{
    const input = document.createElement('input');
    input.type = type;
    if (id) input.id=id;
    if (value) input.value = value;
    nodeName.appendChild(input);
    return input;
};

const labelCreator = (nodeName, labelFor, labelContent)=>{
    const label = document.createElement('label');
    label.for = labelFor;
    label.textContent = labelContent;
    nodeName.appendChild(label);
    return label;
};

const formCreator = (nodeName)=>{
    const form = document.createElement('form');
    nodeName.appendChild(form);
    return form;
};

const formTagCreator = (nodeName)=>{
    const form = formCreator(nodeName);
    const inputs = inputCreator(form,'text','noteTagsInput','wpisz tagi oddzielając je spacją');
    let inputFlag = 0;
    const addTagToNote = (element)=>{
        element.preventDefault();
        noteTags = [(inputs.value).split(' ')];
        console.log(noteTags);
    };
    buttonCreator(form, 'dodaj', addTagToNote);
    inputs.addEventListener('click',()=>inputFlag++?'':inputs.value='');
    return form;
};

const setNoteColor = (nodeName, defaultColorNo)=>{
    const messageBox = document.querySelector('.message');
    const colorBox = document.createElement('div');
    colorBox.classList.add('setNoteColor');
    messageBox.appendChild(colorBox);
    noteColor = defaultColorNo; //kolor domyślny to index 0 tablicy
    
    const setNewColor = (index)=>{
        noteColor=index;
        nodeName.style.backgroundColor = noteColorSets[index].backgroundColor;
        nodeName.style.color = noteColorSets[index].fontColor;
    };

    noteColorSets.forEach((color, index)=>{
        const divColor = document.createElement('div');
        divColor.style.backgroundColor=color.backgroundColor;
        divColor.style.color = color.fontColor;
        if (index===0) divColor.style.border = `${color.fontColor} solid 2px`;
        colorBox.appendChild(divColor);
        divColor.addEventListener('click',()=>setNewColor(index));
    });
    return noteColor;
};

const exitNote = ()=>{
    noteList.textContent='';
    noteList.classList.remove('active');
};

const saveToStorage = ()=>{
    localStorage.setItem(lsKey,JSON.stringify(notes));
};

const sortUserNotes = ()=>{
    const pinnedNotes = notes.filter((note)=>note.pinned);
    const unPinnedNotes = notes.filter((note)=>!note.pinned);
    const allNotes = pinnedNotes.concat(unPinnedNotes);
    for (let index = 0; index<notes.length; index++){
        notes[index]=allNotes[index];
    }
};

const newNote = ()=>{
    noteList.classList.add('active');
    
    const noteTitleDiv = divCreator(noteList, 'title');
    const titleForm = formCreator(noteTitleDiv);
    const noteTitle = inputCreator(titleForm, 'text','','Wprowadź tytuł');
    
    const noteMessageDiv = divCreator(noteList, 'message');
    const noteContent = document.createElement('textarea');
    noteMessageDiv.appendChild(noteContent).classList.add('message');
    setNoteColor(noteContent, 0);
    
    const noteMenuNote = divCreator(noteList, 'menuNote');
    const menuFormTag = formTagCreator(noteMenuNote);
    menuFormTag.classList.add('formTag');
    
    const noteReminder = formCreator(noteMenuNote);
    const noteReminderData = inputCreator(noteReminder,'date','reminderDate');
    const noteReminderTime = inputCreator(noteReminder,'time','reminderTime');
    labelCreator(noteReminder,noteReminderData,'przypomnienie');
    
    const notePinnedNote = formCreator(noteMenuNote);
    const notePinnedValue = inputCreator(notePinnedNote,'checkbox','pinnedNote');
    labelCreator(notePinnedNote,'pinnedNote','pinezka');
        
    const saveNote = ()=>{
        notes.push({
            id: (notes.length+1),
            title: noteTitle.value,
            message: noteContent.value,
            color: noteColor,
            pinned: notePinnedValue.checked,
            startDate: new Date(),
            tags: noteTags,
            reminderDate: noteReminderData.value,
            reminderTime: noteReminderTime.value,
        });
        exitNote();
        saveToStorage();
        showAllUserNotes();
    };
    buttonCreator(noteMenuNote,'anuluj',exitNote, 'cancelNoteBtn');
    buttonCreator(noteMenuNote,'zapisz', saveNote, 'addNoteBtn');
};

const openNote = (index)=>{
    if (noteList.classList.value === 'note active') return;
    const element = notes[index];
    noteList.classList.add('active');
    
    const noteTitleDiv = divCreator(noteList, 'title');
    noteTitleDiv.textContent = element.title;
    noteTitleDiv.classList.add('title', 'input');
    
    const noteMessageDiv = divCreator(noteList, 'message');
    noteMessageDiv.textContent = element.message;
    noteMessageDiv.classList.add('textarea');
    noteMessageDiv.style.backgroundColor = noteColorSets[element.color].backgroundColor;
    noteMessageDiv.style.color = noteColorSets[element.color].fontColor;
    
    const noteMenuNote = divCreator(noteList, 'menuNote');
    const menuFormTag = document.createElement('div');
    menuFormTag.classList.add('formTag');
    menuFormTag.textContent = notes[index].tags? `Tagi: ${notes[index].tags}`: 'Tagi: brak';
    menuFormTag.classList.add('formElements');
    noteMenuNote.appendChild(menuFormTag);
    
    const noteReminder = document.createElement('div');
    noteReminder.textContent = notes[index].reminderDate? `przypomnienie: ${element.reminderDate}: ${element.reminderTime}`:'brak przypomnienia';
    noteReminder.classList.add('formElements');
    noteMenuNote.appendChild(noteReminder);
    
    const notePinnedNote = document.createElement('div');
    notePinnedNote.textContent = element.pinned? 'wiadomość przypięta':'wiadomość nieprzypięta';
    notePinnedNote.classList.add('formElements');
    noteMenuNote.appendChild(notePinnedNote);

    buttonCreator(noteMenuNote,'usuń',()=>{
        notes.splice(index,1);
        exitNote();
        saveToStorage();
        showAllUserNotes();
    });
    buttonCreator(noteMenuNote,'powróć', exitNote);
};

const updateNotesFromLocalStorage = ()=>{
    if (JSON.parse(localStorage.getItem(lsKey))==null) return;
    const lsValues = [...(JSON.parse(localStorage.getItem(lsKey)))];
    lsValues.forEach((lsValue, index)=>{
        notes[index] = lsValue;
    });
};

const showAllUserNotes = ()=>{
    const userNotesDiv = document.querySelector('.userNotes');
    userNotesDiv.textContent='';
    updateNotesFromLocalStorage();
    sortUserNotes();
    notes.forEach((note,index)=>{
        const showNote = document.createElement('div');
        showNote.textContent = notes[index].title;
        showNote.style.backgroundColor = noteColorSets[notes[index].color].backgroundColor;
        showNote.style.color = noteColorSets[notes[index].color].fontColor;
        if (note.pinned) showNote.style.border = `.4vw solid ${noteColorSets[notes[index].color].fontColor}`;
        userNotesDiv.appendChild(showNote);
        showNote.addEventListener('click',()=>openNote(index, note.pinned));
    });
};

showAllUserNotes();

addBtn.addEventListener('click', newNote);