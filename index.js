
// be instantiated with a BPM
// allow for reassigning the BPM
// control the interval of the ticks
// and broadcast to registered listeners
class Ticking {
    constructor(bpm, start = false) {
        this.currentTicking = null;
        this.bpm = bpm;
        this.tickListeners = [];
        this.playStateListeners = [];
        if (start) {
            this.startPlaying();
        }
    }
    setBPM(newBpm) {
        this.bpm = newBpm;
        this.stopPlaying();
    }
    startPlaying() {
        this.currentTicking = setInterval(() => {
            this.tickListeners.forEach(l => l());
        }, Ticking.bpmToMilliseconds(this.bpm));
        this.playStateListeners.forEach(l => l(true));
    }
    stopPlaying() {
        clearInterval(this.currentTicking);
        this.currentTicking = null;
        this.playStateListeners.forEach(l => l(false));
    }
    isPlaying() {
        return this.currentTicking !== null;
    }
    onTick(listener) {
        this.tickListeners.push(listener);
    }
    onPlayChange(listener) {
        this.playStateListeners.push(listener);
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

    const audio = new Audio("https://freewavesamples.com/files/Cowbell-2.wav");
    const playClick = () => {
        audio.play();
    };

    const bpmDisplay = document.querySelector("#current-bpm-value");
    const bpmSlider = document.querySelector("#bpm-slider");
    const playControlButton = document.querySelector("#play-control-button");

    const ticker = new Ticking(60);

    ticker.onTick(() => {
        playClick();
    });

    ticker.onPlayChange((isPlaying) => {
        if (isPlaying) {
            playControlButton.innerHTML = "Pause";
        } else {
            playControlButton.innerHTML = "Play";
        }
    });

    playControlButton.addEventListener("click", () => {
        if (ticker.isPlaying()) {
            ticker.stopPlaying();
        } else {
            ticker.startPlaying();
        }
    });

    bpmSlider.addEventListener("change", () => {
        const bpmValue = bpmSlider.value;
        bpmDisplay.innerHTML = bpmValue;
        ticker.setBPM(parseInt(bpmValue, 10));
    });

});

