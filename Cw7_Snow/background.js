class BackGround {
    constructor(divSelector){
        this.maxSizeX;
        this.maxSizeY;
        this.backgroundColor;
        this.divSelector=divSelector;
    }

    Draw(backgroundColor='darkblue'){
        this.divSelector.style.backgroundColor=backgroundColor;
        this.maxSizeX=window.innerWidth;
        this.maxSizeY=window.innerHeight;
    }
}