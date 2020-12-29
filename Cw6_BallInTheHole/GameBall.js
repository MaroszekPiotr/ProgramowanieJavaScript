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