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
        this.drawBoard; // = this.DrawBoard();
        this.playerBall; // = new GameBall(this); //this.CreatePlayerBall();
        this.targetPoint; // = new TargetPoint(this);
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
        this.targetPoint.CheckIfInside();
    }
    NewGame() {
        this.drawBoard = this.DrawBoard();
        this.playerBall = new GameBall(this); //this.CreatePlayerBall();
        this.targetPoint = new TargetPoint(this);
    }
    StartGame() {
        this.NewGame();
        if (this.gameStatus == null) {
            this.timeStart = Date.now();
            this.gameStatus = setInterval(() => this.AnimeGame(), Math.floor(1000 / this.fps));
        }
    }
    StopGame() {
        this.timeEnd = Date.now();
        clearInterval(this.gameStatus);
        this.gameStatus = null;
    }
    GameSummary(EndGameText) {
        this.StopGame();
        this.DrawBoard();
        this.ctx.beginPath();
        this.ctx.font = '75px Arial';
        this.ctx.fillStyle = 'red';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`You ${EndGameText}!`, this.cw / 2, this.ch / 2);
        this.ctx.font = '50px Arial';
        this.ctx.fillStyle = 'orange';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Game Time: ${((this.timeEnd - this.timeStart)/1000).toFixed(2)}s`, this.cw / 2, this.ch * 0.75);
        this.ctx.closePath();
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
        this.direction = [5, 5];
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
        this.radius = 20;
        this.color = 'red';
    }
    Draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }
    CheckIfInside() {
        let distanceX = Math.abs(this.positionX - this.gameClassObj.playerBall.positionX);
        let distanceY = Math.abs(this.positionY - this.gameClassObj.playerBall.positionY);
        let distanceBetweenCircles = Math.pow((Math.pow(distanceX, 2) + Math.pow(distanceY, 2)), 1 / 2); //odległość od środków
        if (distanceBetweenCircles < this.radius - this.gameClassObj.playerBall.radius) this.gameClassObj.GameSummary('Win');
    }

}
// uruchomienie gry:
const canvas = document.querySelector('canvas');
const game = new BallInTheHole(canvas);
const gameBar = document.querySelector('.gameBar');
gameBar.children[0].addEventListener('click', () => {
    game.StartGame();
});
gameBar.children[1].addEventListener('click', () => {
    game.StopGame();
});