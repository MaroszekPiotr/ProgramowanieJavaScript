class Hole {
    constructor(divSelector, role = 'trap', color='black', positionX = this.GetRandom('positionX'), positionY = this.GetRandom('positionY'), radius = this.GetRandom('size')){
        this.divSelector=divSelector;
        this.positionX=positionX;
        this.positionY=positionY;
        this.radius=radius;
        this.color = color;
        this.setRole = role;
    }

    Draw(){
        // eslint-disable-next-line no-undef
        let svg = new Circle(this.divSelector,this.color,this.radius).Create();
        svg.style.position = 'absolute';
        svg.style.left = this.positionX;
        svg.style.top = this.positionY;
        this.divSelector.appendChild(svg);
        
    }

    GetRandom(attribute){
        let maxSize;
        switch(attribute){
        case 'positionX': 
            maxSize=window.innerWidth-100;
            break;
        case 'positionY':
            maxSize=window.innerHeight-100;
            break;
        case 'size':
            maxSize=window.innerHeight/20;
            break;
        default: 
            maxSize=1;
            break;
        }
        return Math.floor(Math.random()*maxSize)+20;

    }

    TrapHole(){

    }
    WinHole(){
        this.color = 'yellow';
        this.Draw();

    }

    TeleportHole(){
        
    }
}