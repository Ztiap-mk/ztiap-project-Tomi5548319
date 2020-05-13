class Timer extends GameObject {
    constructor(canvas, context, x_mult, y_mult, max_line_width_mult, textSize_mult, colour, minutes, seconds) {
        super(canvas, x_mult, y_mult, max_line_width_mult, textSize_mult);

        this.minutes = minutes;
        this.seconds = seconds;
        this.ended = false;

        this.lastUpdate = Date.now();

        this.timeLeft = 60 * this.minutes + this.seconds;

        this.textStr = "";
        this.updateTime();

        // Text will observe the timer
        var text = new Text(canvas, context, x_mult, y_mult, max_line_width_mult, this.textStr, colour, textSize_mult);
        this.add(text);
    }

    // Update the timer
    onUpdate(dt) {
        var now = Date.now();

        if(now - this.lastUpdate > 1000){ // update only every second
            this.lastUpdate = now;
            this.timeLeft--;

            if(this.minutes > 0 || this.seconds > 0)
                this.seconds--;

            if(this.seconds < 0 && this.minutes > 0) {
                this.minutes--;
                this.seconds += 60;
            }

            if(this.minutes === 0 && this.seconds === 0 && !this.ended){
                this.onEnd();
                this.ended = true;
            }

            this.updateTime();

            var text = this.nodes[0];
            if(text instanceof Text) { // Just to be sure
                text.lines = [];
                text.lines.push(this.textStr);
            }

            // Use for debugging only
            // console.log("Time left: " + this.minutes + ":" + this.seconds);
        }
    }

    updateTime() {
        this.textStr = "";
        if(this.minutes < 10)
            this.textStr += "0";
        this.textStr += this.minutes + ":";
        if(this.seconds < 10)
            this.textStr += "0";
        this.textStr += this.seconds;
    }

    // Executed when timer expires
    onEnd() {}
}