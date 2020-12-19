class SnowStorm {
    constructor(canvasNode, imageHot, imageCold, width = window.innerWidth, height = window.innerHeight, numberOfSnowlakes = 5000, fps = 30) {
        this.imgHot = imageHot;
        this.imgCold = imageCold;
        this.canvasNode = canvasNode;
        this.ctx = this.canvasNode.getContext('2d');
        this.width = width;
        this.height = height;
        this.canvasNode.width = this.width;
        this.canvasNode.height = this.height;
        this.numberOfSnowlakes = numberOfSnowlakes;
        this.fps = fps;
        this.transparency = 0;
        this.snowflakes = [];
        this.createSnowflakes(numberOfSnowlakes);
        setInterval(() => this.startSnowing(), Math.floor(1000 / fps));
    }
    drawBackGround(ctx) {
        ctx.drawImage(this.imgHot, 0, 0, this.imgHot.width, this.imgHot.height, 0, 0, this.width, this.height);
        ctx.save();
        ctx.globalAlpha = this.transparency += 0.0003;
        ctx.drawImage(this.imgCold, 0, 0, this.imgCold.width, this.imgCold.height, 0, 0, this.width, this.height);
        ctx.restore();
    }
    createSnowflakes(numberOfSnowflake) {
        let howLong = (Math.floor(((this.height) * (1000 / this.fps)) / numberOfSnowflake));
        const produceSnow = () => {
            if (this.snowflakes.length == numberOfSnowflake) clearInterval(snowflake);
            else {
                const snowflake = new Snowflake(this.ctx, Math.floor(Math.random() * this.width));
                this.snowflakes.push(snowflake);
            }
        };
        const snowflake = setInterval(produceSnow, howLong);
    }
    animeSnowflakes() {
        this.snowflakes.forEach((snowflake) => {
            this.ctx.save();
            //this.ctx.filter = 'blur(2px)';
            snowflake.drawSnowflake(this.ctx, this.dtx);
            this.ctx.restore();
            snowflake.changeSnowflakePosition(this.width);
        });
    }
    startSnowing() {
        this.drawBackGround(this.ctx, this.color);
        this.animeSnowflakes();
    }
}