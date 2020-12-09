class Circle{
    constructor(selectOutputNode, colorFill='red', r='10'){
        this.output=selectOutputNode;
        this.type = 'circle';
        this.width = r*2;
        this.height = r*2;
        this.cx =r;
        this.cy = r;
        this.r = r;
        this.colorFill = colorFill;
    }

    Create(){
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width',this.width);
        svg.setAttribute('height',this.height);
        svg.textContent = 'Twoja przeglądarka nie wyświetla SVG';
        let objectSvg = document.createElementNS('http://www.w3.org/2000/svg', this.type);
        objectSvg.setAttribute('cx',this.cx);
        objectSvg.setAttribute('cy',this.cy);
        objectSvg.setAttribute('r',this.r);
        objectSvg.setAttribute('fill',this.colorFill);
        svg.appendChild(objectSvg);
        return svg;       
    }
}