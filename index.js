
// be instantiated with a BPM
// allow for reassigning the BPM
// control the interval of the ticks
// and broadcast to registered listeners
class Ticking {
    constructor(bpm, start = false) {
        this.currentTicking = null;
        this.bpm = bpm;
        this.tickListeners = [];
        if (start) {
            this.startPlaying();
        }
    }
    startPlaying() {
        this.currentTicking = setInterval(() => {
            this.tickListeners.forEach(l => l());
        }, Ticking.bpmToMilliseconds(this.bpm));
    }
    stopPlaying() {
        clearInterval(this.currentTicking);
        this.currentTicking = null;
    }
    onTick(listener) {
        this.tickListeners.push(listener);
    }
    static bpmToMilliseconds(bpmValue) {
        // 60bpm -> 1 beat every second 
        // 30bpm -> 1 beat every 2 seconds
        // 120bpm -> 2 beats every second
        const amountOfMillisecondsInAMinute = 1000 * 60;
        return amountOfMillisecondsInAMinute / bpmValue;
    }
}


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

        const ticker = new Ticking(30);

        ticker.onTick(() => {
            playClick();
        });

        ticker.onTick(() => {
            console.count("tick!");
        });

        ticker.startPlaying();

    });


});

