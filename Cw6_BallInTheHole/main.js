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
        setInterval(() => this.AnimeGame(), Math.floor(1000 / this.fps));
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
        let alpha; //grawitacja lewo prawo 0 pozycja wyjściowa, zakres od -90 (skrajne lewo) do +90 skrajne prawo
        let beta; //ustawia grawitację dół góra 90 pozycja wyjściowa 0-90 dół, 90-180 góra
        let gamma;
        addEventListener('deviceorientation', (e) => {
            if (e.alpha > -90 && e.alpha < 0) this.direction[0] = (Math.abs(e.alpha / 30) * -1);
            else if (e.alpha > 0 && e.alpha < 90) this.direction[0] = (Math.abs(e.alpha / 30));
            if (e.beta > 0 && e.beta < 90) this.direction[1] = (Math.abs(e.beta / 30));
            else if (e.beta > 90 && e.beta < 180) this.direction[1] = (Math.abs(e.beta / 30) * -1);
            // else if (e.alpha < 0) this.direction[1] = (e.alpha / 30) * -1;
            // this.direction[1] = e.alpha / 30;
            // this.direction[0] = e.beta / 30;
        });
    }
}


// praca z Canvas:
const canvas = document.querySelector('canvas');

const game = new BallInTheHole(canvas);
// addEventListener('deviceorientation', (e) => console.log(e.alpha));