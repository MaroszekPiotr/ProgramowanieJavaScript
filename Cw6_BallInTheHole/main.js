// // import * from './gameBoard.js';
// let divSelector = document.querySelector('.gameBoard');
// new GameBoard(divSelector).Draw();
// new Ball(divSelector).Draw();
// let hole = new Hole(divSelector);
// hole.Draw();

class BallInTheHole {
    constructor(input, fps = 60) {
        //ustawienia canvas:
        this.canvas = input;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - (window.innerHeight * 0.06);
        this.cw = canvas.width; //skrót
        this.ch = canvas.height; //skrót
        //inne:
        this.fps = fps;
        this.drawBoard = this.DrawBoard();
        this.playerBall = new GameBall(this); //this.CreatePlayerBall();
        this.targetPoint = new TargetPoint(this);
        this.gameStatus;
        this.timeStart;
        this.timeEnd;
        this.StartGame();

    }
    DrawBoard() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.cw, this.ch);
        this.ctx.closePath();
    }
    AnimeGame() {
        this.DrawBoard();
        this.playerBall.MoveBall();
        this.targetPoint.Draw();
    }
    StartGame() {
        if (this.gameStatus == null) {
            this.timeStart = Date.now();
            this.gameStatus = setInterval(() => this.AnimeGame(), Math.floor(1000 / this.fps));
        }


    }
    StopGame() {
        this.timeEnd = Date.now();
        clearInterval(this.gameStatus);
        this.gameStatus = null;
        //console.log(((this.timeEnd - this.timeStart) / 1000).toFixed(2) + 's');

    }
    Win() {

    }
    Lose() {

    }
}

class GameBall {
    constructor(gameClassObj) {
        this.gameClassObj = gameClassObj;
        this.ctx = gameClassObj.ctx;
        this.positionX = 10;
        this.positionY = 10;
        this.radius = 10;
        this.color = 'yellow';
        this.direction = [10, 10];
        this.ControlBall();
    }
    DrawBall() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    MoveBall() {
        this.positionX += this.direction[0];
        this.positionY += this.direction[1];
        if (this.positionX > (this.gameClassObj.cw - this.radius / 2) || this.positionX < this.radius / 2) this.direction[0] *= -1;
        if (this.positionY > (this.gameClassObj.ch - this.radius / 2) || this.positionY < this.radius / 2) this.direction[1] *= -1;
        this.DrawBall();
    }
    ControlBall() {
        window.addEventListener('deviceorientation', (e) => {
            if (Math.abs(e.gamma) > 90) this.direction[1] = 5;
            else this.direction[1] = -5;
            if (Math.abs(e.alpha) > 90) this.direction[0] = 5;
            else this.direction[0] = -5;
        });
    }
}

class TargetPoint {
    constructor(gameClassObj) {
        this.gameClassObj = gameClassObj;
        this.ctx = gameClassObj.ctx;
        this.positionX = Math.floor(Math.random() * (gameClassObj.cw - 40)) + 20;
        this.positionY = Math.floor(Math.random() * (gameClassObj.ch - 40)) + 20;
        this.radius = 15;
        this.color = 'red';
    }
    Draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

}


// uruchomienie gry:
const canvas = document.querySelector('canvas');
const game = new BallInTheHole(canvas);
const gameBar = document.querySelector('.gameBar');
gameBar.children[0].addEventListener('click', (e) => {
    e.preventDefault();
    game.StartGame();
});
gameBar.children[1].addEventListener('click', (e) => {
    e.preventDefault();
    game.StopGame();
});