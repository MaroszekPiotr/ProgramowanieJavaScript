class Snowflake {
    constructor(canvasCtx, posiotionX = 0, maxwidth = 1000, radius = Math.floor(Math.random() * 5)) {
        this.ctx = canvasCtx;
        this.radius = radius;
        this.positionX = posiotionX;
        this.positionY = 0;
        this.windPosition = 0;
        this.windFlag = true;
        this.maxwidth = maxwidth;
        this.speed = radius;
        this.color;
        this.setColor();
    }
    setColor() {
        if (this.radius >= 4) this.color = 'white';
        else if (this.radius >= 3) this.color = 'lightgray';
        else if (this.radius >= 2) this.color = 'gray';
        else this.color = 'darkgray';

    }
    drawSnowflake(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.positionX + this.windSimulator(), this.positionY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    windSimulator() {
        if (this.positionX % 2 === 0) return (Math.sin(this.positionY / 50) * this.radius * 3);
        if (this.positionX % 3 === 0) return (Math.cos(this.positionY / 50) * this.radius * 3);
        return this.positionY / 15;
    }
    changeSnowflakePosition(maxWidth, speed = this.speed) {
        this.positionY += speed;
        if (this.positionY > window.innerHeight) {
            this.positionY = 0;
            this.positionX = Math.floor(Math.random() * maxWidth);
        }
    }
}