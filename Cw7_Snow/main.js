const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// canvas.width = 1000;
// canvas.height = 500;
// const cw = canvas.width;
// const ch = canvas.height;

// const drawSnowStorm = () => {
//     ctx.fillStyle = 'black';
//     ctx.arc(0, 0, 40, 0, 2 * Math.PI);
//     ctx.fill();
//     // ctx.stroke();
//     //ctx.fillRect(0, 0, cw, ch);
// };

// drawSnowStorm();


class SnowStorm {
    constructor(canvasNode, color = 'darkblue', width = window.innerWidth, height = window.innerHeight) {
        this.canvasNode = canvasNode;
        this.ctx = this.canvasNode.getContext('2d');
        this.width = width;
        this.height = height;
        this.color = color;
        this.cornflake = new Snowflake(this.ctx, 50);
        setInterval(() => this.startSnowing(), 100);
    }
    drawBackGround(ctx, color) {
        this.canvasNode.width = this.width;
        this.canvasNode.height = this.height;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, this.width, this.height);
    }
    drawSnowflake() {
        new Snowflake(this.ctx, 50);
    }
    startSnowing(snowflakeNumber) {
        this.drawBackGround(this.ctx, this.color);
        console.log('ok');
        this.cornflake.drawSnowflake(this.ctx);
    }
}
class Snowflake {
    constructor(canvasCtx, posiotionX = 0, radius = Math.floor(Math.random() * 20)) {
        this.ctx = canvasCtx;
        this.radius = radius;
        this.positionX = posiotionX;
        this.positionY = 0;
        //this.drawSnowflake(this.ctx);
        this.animeSnowflake();
    }
    drawSnowflake(ctx) {
        ctx.fillStyle = 'white';
        ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    animeSnowflake() {
        setInterval(() => {
            this.positionY++;
        }, 50);
    }
}
const example = new SnowStorm(canvas);
// const snowflake = new Snowflake(example.ctx, 50);