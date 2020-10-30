const notes = [];
const noteList = document.querySelector('.note');
const addBtn = document.querySelector('#addBtn');

const note = {
    id: 'id',
    title: 'title',
    message: 'content',
    color: 'color',
    pinned: 0,
    startDate: new (Date),
    tag: [],
    reminder: null,
};

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
    form.action='';
    nodeName.appendChild(form);
    return form;
};

const formTagCreator = (nodeName)=>{
    const form = formCreator(nodeName);
    const inputs = inputCreator(form,'text','','wpisz tag, możesz dodać ich wiele');
    const button = buttonCreator(form, 'dodaj', temporarycl);
    return form;
};

const newNote = ()=>{
    noteList.classList.add('active');
    
    const noteTitleDiv = divCreator(noteList, 'title');
    const titleForm = formCreator(noteTitleDiv);
    const noteTitle = inputCreator(titleForm, 'text','','Wprowadź tytuł');
    
    const noteMessageDiv = divCreator(noteList, 'message');
    const noteContent = document.createElement('textarea');
    noteMessageDiv.appendChild(noteContent).classList.add('message');
    
    const noteMenuNote = divCreator(noteList, 'menuNote');
    const menuFormTag = formTagCreator(noteMenuNote);
    menuFormTag.classList.add('formTag');
    
    const noteReminder = formCreator(noteMenuNote);
    const noteReminderData = inputCreator(noteReminder,'date','reminderDate');
    inputCreator(noteReminder,'time','reminderTime');
    labelCreator(noteReminder,noteReminderData,'przypomnienie');
    
    const notePinnedNote = formCreator(noteMenuNote);
    const notePinnedValue = inputCreator(notePinnedNote,'checkbox','pinnedNote');
    labelCreator(notePinnedNote,'pinnedNote','pinezka');
        
    const exitNote = ()=>{
        noteList.textContent='';
        noteList.classList.remove('active');
    };

    const saveNote = ()=>{
        console.log(`id: ${notes.length+1}`);
        console.log(`title: ${noteTitle.value}`);
        console.log(`message: ${noteContent.value}`);
        console.log(`color: ${notes.length+1}`);
        console.dir(`pinned: ${notePinnedValue.checked}`);
        console.log(`startDate: ${new Date()}`);
        console.log(`tag: ${notes.length+1}`);
        console.log(`reminder: ${notes.length+1}`);


        // {
        //     id: notes.length+1,
        //     title: noteTitle.value,
        //     message: 'content',
        //     color: 'color',
        //     pinned: 0,
        //     startDate: new (Date),
        //     tag: [],
        //     reminder: null,
        // }

        // exitNote();
    };

    buttonCreator(noteMenuNote,'anuluj',exitNote, 'cancelNoteBtn');
    buttonCreator(noteMenuNote,'zapisz', saveNote, 'addNoteBtn');
    
};

addBtn.addEventListener('click', newNote);