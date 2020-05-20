class Video extends GameObject {
    constructor(canvas, src, x_mult, y_mult, width_mult, height_mult) {
        // Construct a Widget
        super(canvas, x_mult, y_mult, width_mult, height_mult);

        this.video = document.createElement("video");
        this.source = document.createElement("source");
        this.source.type = "video/mp4";
        this.source.src = src;
        this.video.appendChild(this.source);

        this.video.defaultMuted = true;
        this.video.loop = true;
        this.video.autoplay = true;

        // Note: This video won't be visible, because we didn't append it to the HTML page

        this.physical = false;
    }

    // Redefine draw
    ondraw(context) {

        // Render the current frame
        context.drawImage(this.video, this.x, this.y, this.width, this.height);

    }
}