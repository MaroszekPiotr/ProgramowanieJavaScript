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
    constructor(canvasNode, snowSpeed = 1, numberOfSnowlakes = 500, fps = 60, color = 'darkblue', width = window.innerWidth, height = window.innerHeight) {
        this.canvasNode = canvasNode;
        this.ctx = this.canvasNode.getContext('2d');
        this.width = width;
        this.height = height;
        this.color = color;
        this.numberOfSnowlakes = numberOfSnowlakes;
        this.fps = fps;
        this.snowSpeed = snowSpeed;
        this.snowflakes = [];
        this.snowExample = new Snowflake(this.ctx, 50);
        this.drawSnowflakes(numberOfSnowlakes);
        setInterval(() => this.startSnowing(), 100);
    }
    drawBackGround(ctx, color) {
        this.canvasNode.width = this.width;
        this.canvasNode.height = this.height;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, this.width, this.height);
    }
    drawSnowflakes(numberOfSnowflake) {
        let howlong = 0; //ma wyliczyć jak długo będzie spadał płatek śniegu, w tym czasie powinny się rozsypać wszystkie płatki
        const produceSnow = () => {
            if (this.snowflakes.length == numberOfSnowflake) clearInterval(snowflake);
            else {
                const snowflake = new Snowflake(this.ctx, Math.floor(Math.random() * this.width));
                this.snowflakes.push(snowflake);
            }
        };
        const snowflake = setInterval(produceSnow, 20);
    }
    startSnowing(snowflakeNumber) {
        this.drawBackGround(this.ctx, this.color);
        this.snowExample.drawSnowflake(this.ctx);
    }
}
class Snowflake {
    constructor(canvasCtx, posiotionX = 0, maxwidth = 1000, radius = Math.floor(Math.random() * 20)) {
        this.ctx = canvasCtx;
        this.radius = radius;
        this.positionX = posiotionX;
        this.positionY = 0;
        this.maxwidth = maxwidth;
        this.animeSnowflake();
    }
    drawSnowflake(ctx) {
        ctx.fillStyle = 'white';
        ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    animeSnowflake() {
        setInterval(() => {
            this.positionY += 10;
            if (this.positionY > window.innerHeight) {
                this.positionY = 0;
                this.positionX = Math.floor(Math.random() * 100);
            }
        }, 50);
    }
}
const example = new SnowStorm(canvas);
// const snowflake = new Snowflake(example.ctx, 50);