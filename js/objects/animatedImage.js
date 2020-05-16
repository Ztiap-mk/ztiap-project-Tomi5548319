class AnimatedImage extends GameObject {
    constructor(canvas, x_mult, y_mult, width_mult, height_mult, src, frameWidth, frameHeight, numberOfFrames, refreshTime) {
        // Construct Widget
        super(canvas, x_mult, y_mult, width_mult, height_mult);

        this.imgSrc = src;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.numberOfFrames = numberOfFrames;

        this.lastUpdate = Date.now();
        this.refreshTime = refreshTime; // How fast should the animation refresh, in miliseconds
        this.actualFrame = 0; // First frame

        this.physical = false;
    }

    // Redefine ondraw function
    ondraw(context) {

        var img = new Image();
        img.src = this.imgSrc;

        context.drawImage(img, this.actualFrame * this.frameWidth, 0, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height);
    }

    // Redefine onclick function
    onclick(event) {
        if (this.action) return this.action();
    }

    onUpdate(dt) {
        var now = Date.now();

        if(now - this.lastUpdate > this.refreshTime) { // Refresh the animation
            this.actualFrame++;
            this.lastUpdate = now;

            if(this.actualFrame >= this.numberOfFrames)
                this.actualFrame = 0;
        }
    }


    // By default do nothing on click
    action() {}
}