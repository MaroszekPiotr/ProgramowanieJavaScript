const notes = [];
const noteList = document.querySelector('.note');
const addBtn = document.querySelector('#addBtn');
const noteColorSets = [{backgroundColor: '#272121', fontColor: '#f9d276'},{backgroundColor: '#cf7500', fontColor: '#f4f4f4'},{backgroundColor: '#07689f', fontColor: '#ffc93c'},{backgroundColor: '#2d4059', fontColor: '#ea5455'},{backgroundColor: '#fddb3a', fontColor: '#52575d'},{backgroundColor: '#fadcac', fontColor: '#158467'},{backgroundColor: '#206a5d', fontColor: '#81b214'}];
let noteColor;
let noteTags;

notes.push({
    id: (notes.length+1),
    title: 'testowa notka',
    message: 'lorem tararam',
    color: 0,
    pinned: false,
    startDate: new Date(),
    tags: noteTags,
    reminderDate: null,
    reminderTime: null,
});
notes.push({
    id: (notes.length+1),
    title: 'testowa notka2',
    message: 'lorem tararam',
    color: 1,
    pinned: false,
    startDate: new Date(),
    tags: noteTags,
    reminderDate: null,
    reminderTime: null,
});
notes.push({
    id: (notes.length+1),
    title: 'testowa notka3',
    message: 'lorem tararam',
    color: 2,
    pinned: true,
    startDate: new Date(),
    tags: noteTags,
    reminderDate: null,
    reminderTime: null,
});
notes.push({
    id: (notes.length+1),
    title: 'testowa notka4',
    message: 'lorem tararam',
    color: 3,
    pinned: false,
    startDate: new Date(),
    tags: noteTags,
    reminderDate: null,
    reminderTime: null,
});

const temporarycl = (element)=>console.log(element);

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
    // form.action='';
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
        
    const exitNote = ()=>{
        noteList.textContent='';
        noteList.classList.remove('active');
    };
    const saveNote = ()=>{
        // console.log(`id: ${notes.length+1}`);
        // console.log(`title: ${noteTitle.value}`);
        // console.log(`message: ${noteContent.value}`);
        // console.log(`color: ${noteColor}`);
        // console.log(`pinned: ${notePinnedValue.checked}`);
        // console.log(`startDate: ${new Date()}`);
        // console.log(`tag: ${noteTags}`);
        // console.log(`reminder Date: ${noteReminderData.value}`);
        // console.log(`reminder Time: ${noteReminderTime.value}`);
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
        showAllUserNotes();
    };
    buttonCreator(noteMenuNote,'anuluj',exitNote, 'cancelNoteBtn');
    buttonCreator(noteMenuNote,'zapisz', saveNote, 'addNoteBtn');
};

const openNote = (element)=>{
    noteList.classList.add('active');
    
    const noteTitleDiv = divCreator(noteList, 'title');
    noteTitleDiv.textContent = element.title;
    
    const noteMessageDiv = divCreator(noteList, 'message');
    noteMessageDiv.textContent = element.message;
    noteMessageDiv.style.backgroundColor = noteColorSets[element.color].backgroundColor;
    noteMessageDiv.style.color = noteColorSets[element.color].fontColor;
    
    const noteMenuNote = divCreator(noteList, 'menuNote');
    const menuFormTag = document.createElement('div');
    menuFormTag.classList.add('formTag');
    menuFormTag.textContent = 'tagi';
    
    const noteReminder = document.createElement('div');
    noteReminder.textContent = `${element.reminderDate}: ${element.reminderTime}`;
    
    const notePinnedNote = document.createElement('div');
    notePinnedNote.textContent = element.pinned? 'przypięte':'nieprzypięte';
    

};

const showAllUserNotes = ()=>{
    const userNotesDiv = document.querySelector('.userNotes');
    userNotesDiv.textContent='';
    notes.forEach((note,index)=>{
        const showNote = document.createElement('div');
        showNote.textContent = notes[index].title;
        showNote.style.backgroundColor = noteColorSets[notes[index].color].backgroundColor;
        showNote.style.color = noteColorSets[notes[index].color].fontColor;
        if (note.pinned) showNote.style.border = `.4vw solid ${noteColorSets[notes[index].color].fontColor}`;
        userNotesDiv.appendChild(showNote);
        showNote.addEventListener('click', openNote); //wpisać instrukcję dla note .active
    });
};

showAllUserNotes();

addBtn.addEventListener('click', newNote);