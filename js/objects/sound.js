class Sound {
    constructor(src, generalVolume, volumeMultiplier) {
        this.sound = document.createElement("audio");
        this.sound.src = src;

        this.volumeMultiplier = volumeMultiplier;
        this.volume = generalVolume * this.volumeMultiplier; // won't be set to 0 when muted
        this.sound.volume = this.volume; // will be set to 0 when muted

        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";

        document.body.appendChild(this.sound);
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