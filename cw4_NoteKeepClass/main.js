/* eslint-disable no-undef */
const userNotesNodeName = document.querySelector('.userNotes');
const addBtn = document.querySelector('#addBtn');
const searchForm = document.querySelector('searchForm');
const noteNode = document.querySelector('.note');
new NotesKeep(userNotesNodeName, addBtn, noteNode, searchForm);