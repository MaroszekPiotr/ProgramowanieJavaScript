// uruchomienie gry:
const canvas = document.querySelector('canvas');
const game = new BallInTheHole(canvas);
const gameBar = document.querySelector('.gameBar');
gameBar.children[0].addEventListener('click', () => {
    game.StartGame();
});
gameBar.children[1].addEventListener('click', () => {
    game.StopGame();
});