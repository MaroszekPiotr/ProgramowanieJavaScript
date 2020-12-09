class Snow {
    constructor(divSelector, startPositionX = '200', startPositionY ='200'){
        this.divSelector=divSelector;
        this.positionX = startPositionX;
        this.positionY = startPositionY;
    }

    Draw(color='white'){
        // eslint-disable-next-line no-undef
        let svg = new Circle(this.divSelector,color,'20').Create();
        svg.style.position = 'absolute';
        svg.style.zIndex = '10';
        svg.style.left = this.positionX;
        svg.style.top = this.positionY;
        this.divSelector.appendChild(svg);
        
    }

    Move() {

    }
}
