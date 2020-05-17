class Sound {
    constructor(src, soundSettings, volumeMultiplier) {
        this.sound = document.createElement("audio");
        this.sound.src = src;

        this.volumeMultiplier = volumeMultiplier;
        this.volume = soundSettings.volume * this.volumeMultiplier; // won't be set to 0 when muted
        this.sound.volume = this.volume; // will be set to 0 when muted

        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";

        document.body.appendChild(this.sound);

        if (soundSettings.muted === true)
            this.changeVolume(0);

        this.play();
    }

    play() {
        this.sound.play();
    }

    changeVolume(volume) {
        this.volume = volume * this.volumeMultiplier;
        this.sound.volume = this.volume;
    }

    pause() {
        this.sound.pause();
    }

    stop() {
        // TODO
        this.sound.pause();
    }

}