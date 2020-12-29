/* eslint-disable indent */
class GameBall {
    constructor(gameClassObj, ballSpeed = 5) {
        this.gameClassObj = gameClassObj;
        this.ctx = gameClassObj.ctx;
        this.positionX = 10;
        this.positionY = 10;
        this.radius = 10;
        this.color = 'yellow';
        this.ballSpeed = ballSpeed;
        this.direction = [this.ballSpeed, this.ballSpeed];
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
        if (this.positionX > (this.gameClassObj.cw - this.radius / 2)) this.direction[0] = this.ballSpeed * -1;
        if (this.positionX < this.radius / 2) this.direction[0] = this.ballSpeed;
        if (this.positionY > (this.gameClassObj.ch - this.radius / 2)) this.direction[1] = this.ballSpeed * -1;
        if (this.positionY < this.radius / 2) this.direction[1] = this.ballSpeed;
        this.DrawBall();
    }
    ControlBall() {
        window.addEventListener('deviceorientation', (e) => {
            if (e.alpha > 0) this.direction[0] = this.ballSpeed;
            else this.direction[0] = this.ballSpeed * -1;
            if (e.beta > 0) this.direction[1] = this.ballSpeed;
            else this.direction[1] = this.ballSpeed * -1;
        });
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.direction[1] = this.ballSpeed * -1;
                    break;
                case 'ArrowDown':
                    this.direction[1] = this.ballSpeed;
                    break;
                case 'ArrowLeft':
                    this.direction[0] = this.ballSpeed * -1;
                    break;
                case 'ArrowRight':
                    this.direction[0] = this.ballSpeed;
                    break;
            }


        });
    }
}