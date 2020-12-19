const canvas = document.querySelector('canvas');
const imageHot = new Image();
imageHot.src = './images/summer.jpg';
const imageCold = new Image();
imageCold.src = './images/winter.jpg';


const example = new SnowStorm(canvas, imageHot, imageCold, 690, 519);