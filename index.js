window.addEventListener("DOMContentLoaded", () => {

    const audio = new Audio("drumsticks.wav");
    const playClick = () => {
        audio.play();
        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
        }, 800);
    };

    const playButton = document.querySelector("#play-button");

    playButton.addEventListener("click", () => {
        setInterval(() => {
            playClick();
        }, 1000);
    });
});

