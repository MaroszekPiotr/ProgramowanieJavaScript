// // import * from './gameBoard.js';
// let divSelector = document.querySelector('.gameBoard');
// new GameBoard(divSelector).Draw();
// new Ball(divSelector).Draw();
// let hole = new Hole(divSelector);
// hole.Draw();


// praca z Canvas:
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;
const cw = canvas.width;
const ch = canvas.height;

const drawBoard = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cw, ch);
};
drawBoard();