const lightBox = document.querySelector('.lightbox');
const lightBoxImg = document.querySelector('.lightbox img');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');
const imageObjects = [];
let numberOfImages = undefined;
for (let i = 0, imgs = [...(document.querySelectorAll('.gallery img'))]; i<imgs.length;i++){
    imageObjects[i] = {
        number: i,
        imageURL: imgs[i].src,     
    };
    imgs[i].addEventListener('click', ()=>showLightBox(imageObjects[i]));
    if (i===(imgs.length - 1)) {
        numberOfImages = imgs.length - 1;
    }       
}

let prevImg = imageObjects[0];
let nextImg = imageObjects[0];

const isExistNearImage = (actualImageNumber, operation) => {
    let anotherImageNumber = false;
    switch (operation){
    case 'next': 
        if (actualImageNumber.number<numberOfImages) {
            return imageObjects[(actualImageNumber.number + 1)];
        }
        break;
    case 'prev': 
        if (actualImageNumber.number>0) {
            return imageObjects[(actualImageNumber.number - 1)];
        }
        break;
    }
    return anotherImageNumber;
};

const showLightBox = (imageObject) => {
    lightBoxImg.src = imageObject.imageURL;
    lightBox.classList.add('visible');    
    isExistNearImage(imageObject, 'prev') ? prevBtn.classList.remove('displayNone') : prevBtn.classList.add('displayNone');
    isExistNearImage(imageObject, 'next') ? nextBtn.classList.remove('displayNone') : nextBtn.classList.add('displayNone');
    prevImg = isExistNearImage(imageObject, 'prev');
    nextImg = isExistNearImage(imageObject, 'next');
};

document.querySelector('.lightbox img').addEventListener('click', ()=>lightBox.classList.remove('visible'));
prevBtn.addEventListener('click', () => showLightBox(prevImg));
nextBtn.addEventListener('click', () => showLightBox(nextImg));