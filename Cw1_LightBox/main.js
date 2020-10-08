const images = document.querySelectorAll('.gallery img');

for (let idx = 0; idx < images.length; idx++) {
    const img = images[idx];
    img.addEventListener('click', showLightbox);
}

//images.addEventListener('click', showLightBox);

function showLightbox(ev) {
    console.dir(ev.target);
    const lightbox = document.querySelector('.lightbox');
    const img = document.querySelector('.lightbox img');
    const imgUrl = ev.target.src;
    img.src = imgUrl;
    lightbox.classList.toggle('visible');
    console.log('showlight');
}

const openImage = document.querySelector('.lightbox img ');

openImage.addEventListener('click', hideLightBox);

function hideLightBox(ev) {
    console.dir(ev.target);
    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.toggle('visible');
    lightbox.classList.toggle('livebox');
    console.log('hidelight');
}