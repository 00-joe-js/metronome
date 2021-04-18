
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
    setBPM(newBpm) {
        this.bpm = newBpm;
        if (this.currentTicking !== null) {
            this.stopPlaying();
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

    const audio = new Audio("https://freewavesamples.com/files/Cowbell-2.wav");
    const playClick = () => {
        audio.play();
    };

    const bpmDisplay = document.querySelector("#current-bpm-value");
    const bpmSlider = document.querySelector("#bpm-slider");
    const playButton = document.querySelector("#play-button");

    const ticker = new Ticking(60);

    ticker.onTick(() => {
        playClick();
    });

    ticker.onTick(() => {
        console.count("tick!");
    });

    playButton.addEventListener("click", () => {
        ticker.startPlaying();
    });

    bpmSlider.addEventListener("change", () => {
        const bpmValue = bpmSlider.value;
        bpmDisplay.innerHTML = bpmValue;
        ticker.setBPM(parseInt(bpmValue, 10));
    });

});

