// import * from './gameBoard.js';
let divSelector = document.querySelector('.gameBoard');
new GameBoard(divSelector).Draw();
new Ball(divSelector).Draw();
let hole = new Hole(divSelector);
hole.Draw();
