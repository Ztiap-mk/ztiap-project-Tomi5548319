class Text extends GameObject {
    constructor(canvas, context, x_mult, y_mult, max_line_width_mult, text, colour, textSize_mult) {
        // Construct a GameObject
        super(canvas, x_mult, y_mult, max_line_width_mult, textSize_mult);

        this.physical = false;

        this.colourDefault = colour; // Default colour
        this.colour = colour; // Actual colour
        this.font = this.height + "px Arial";
        this.textSize = this.height;
        this.lines = this.splitTextIntoLines(text, context);
        this.border = false;
        this.selected = false;

        this.height *= this.lines.length; // Update the height based on the number of lines
    }

    // Redefine ondraw function
    ondraw(context) {

        // Text border
        if (this.border) {
            context.strokeStyle = this.colour;
            context.beginPath();
            context.rect(this.x, this.y, this.width, this.height);
            context.stroke();
        }

        if (this.selected)
            this.colour = "green";
        else
            this.colour = this.colourDefault;

        // Write text down, line by line
        context.font = this.font;
        context.fillStyle = this.colour;

        for (var i = 0; i < this.lines.length; i++)
            context.fillText(this.lines[i], this.x, this.y + this.textSize * (i + 1));

    }

    // Split the entry text into lines, depending on the maximum line width
    splitTextIntoLines(text, context) {
        var lines = [];
        var words = text.split(" ");

        var line = "";
        var lineWidth;
        for (var i = 0; i < words.length; i++) {
            if(words[i] === "{newLine}"){
                lines.push(line); // Save the line
                line = ""; // Empty the line
                continue;
            }
            context.font = this.font;
            if(context.measureText(words[i]).width > this.width) // This word is too long, and won't fit into a single line
                break; // TODO split the word into multiple pieces, i.e. wo-rd
            if(line === "") {
                lineWidth = context.measureText(words[i]).width;
                if (lineWidth <= this.width) // Line is not too long
                    line += words[i];
            }
            else {
                lineWidth = context.measureText(line + " " + words[i]).width;
                if (lineWidth <= this.width) { // Line is not too long
                    line += " ";
                    line += words[i];
                }
            }

            if(lineWidth > this.width) { // Line would be too long if we add another word => add a line break
                lines.push(line); // Save the line
                line = ""; // Empty the line
                i--; // Read this word again
            }
        }

        lines.push(line); // Save the last line

        return lines;
    }
}