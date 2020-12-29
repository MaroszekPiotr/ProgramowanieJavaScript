/* eslint-disable no-undef */
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
        this.drawBoard;
        this.playerBall;
        this.levels = [];
        this.actualLevel = 0;
        this.gameStatus;
        this.timeStart;
        this.timeEnd;
        this.DrawBoard();
    }
    SetLevels(numberOfLevels = 5) {
        this.actualLevel = 0;
        this.levels.length = 0;
        for (let i = 0; i < numberOfLevels; i++) {
            let newLevel;
            i == 0 ? newLevel = new TargetPoint(this, 'Win') : newLevel = new TargetPoint(this, 'Lose');
            this.levels.push(newLevel);
        }

    }
    NextLevel() {
        this.levels[this.actualLevel].ChangeRole('Lose');
        this.levels[++this.actualLevel].ChangeRole('Win');
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
        this.levels.forEach((level) => {
            level.Draw();
            level.CheckIfInside();
        });
    }
    NewGame() {
        this.drawBoard = this.DrawBoard();
        this.playerBall = new GameBall(this);
        this.SetLevels();
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
        setTimeout(() => {
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
        }, 50);

    }
}