class Text extends GameObject {
    constructor(canvas, context, x_mult, y_mult, max_line_width_mult, text, colour, textSize_mult) {
        // Construct a GameObject
        super(canvas, x_mult, y_mult, max_line_width_mult, textSize_mult);

        this.colour = colour;
        this.font = this.height + "px Arial";
        this.textSize = this.height;
        this.lines = this.splitTextIntoLines(text, context);

        this.height *= this.lines.length; // Update the height based on the number of lines
    }

    // Redefine ondraw function
    ondraw(context) {

        // Text boundary - use for debugging
        /*context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();*/

        // Write text down, line by line
        context.font = this.font;
        context.fillStyle = this.colour;

        for (var i = 0; i < this.lines.length; i++)
            context.fillText(this.lines[i], this.x, this.y + this.textSize * (i + 1));

    }

    // Split the entry text into lines, depending on the maximum line width
    splitTextIntoLines(text, context) {
        var lines = [];

        var line = "";
        var lineWidth;
        for (var i = 0; i < text.length; i++) {
            context.font = this.font;
            lineWidth = context.measureText(line + text[i]).width;
            if (lineWidth < this.width) // Line is not too long
                line += text[i];
            else { // Line would be too long if we add another letter => add a line break
                lines.push(line); // Save the line
                line = text[i]; // Start a new line
            }
        }
        lines.push(line);

        return lines;
    }
}