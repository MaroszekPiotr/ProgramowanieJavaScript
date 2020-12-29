class TargetPoint {
    constructor(gameClassObj, role) {
        this.gameClassObj = gameClassObj;
        this.ctx = gameClassObj.ctx;
        this.positionX = Math.floor(Math.random() * (gameClassObj.cw - 40)) + 20;
        this.positionY = Math.floor(Math.random() * (gameClassObj.ch - 40)) + 20;
        this.radius = 25;
        this.role = role;
        this.color = role.toLowerCase() == 'win' ? 'red' : 'gray';
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
        if (distanceBetweenCircles < this.radius - this.gameClassObj.playerBall.radius) this.gameClassObj.GameSummary(this.role);
    }

}