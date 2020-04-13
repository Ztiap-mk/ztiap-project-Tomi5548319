function linesCollide(line1, line2) {

    // Draw the lines
    /*var context = app.context;

    context.strokeStyle = "red";

    context.beginPath();
    context.moveTo(line1.x1, line1.y1);
    context.lineTo(line1.x2, line1.y2);
    context.stroke();

    context.beginPath();
    context.moveTo(line2.x1, line2.y1);
    context.lineTo(line2.x2, line2.y2);
    context.stroke();*/

    // Normal vector
    var n1 = {
        x: -(line1.y1 - line1.y2),
        y: line1.x1 - line1.x2
    };

    // Normal vector
    var n2 = {
        x: -(line2.y1 - line2.y2),
        y: line2.x1 - line2.x2
    };

    // ax + by + c = 0
    // => c = -(ax + by)
    // => y = (-(ax + c))/b
    var eqn1 = {
        a: n1.x,
        b: n1.y,
        c: -(n1.x * line1.x1 + n1.y * line1.y1)
    };

    // ax + by + c = 0
    // => c = -(ax + by)
    // => y = (-(ax + c))/b
    var eqn2 = {
        a: n2.x,
        b: n2.y,
        c: -(n2.x * line2.x1 + n2.y * line2.y1)
    };

    if (n1.x / n2.x === n1.y / n2.y) { // Lines have the same angle
        var multiplier = n1.x / n2.x;
        eqn2 = {
            a: n2.x * multiplier,
            b: n2.y * multiplier,
            c: -(n2.x * line2.x1 + n2.y * line2.y1) * multiplier
        };

        if (eqn1.c === eqn2.c) // Lines are on each other
            if (line1.x1 < line1.x2)
                return ((line1.x1 <= line2.x1 && line1.x2 >= line2.x1) || (line1.x1 <= line2.x2 && line1.x2 >= line2.x2));
            else
                return ((line1.x2 <= line2.x1 && line1.x1 >= line2.x1) || (line1.x2 <= line2.x2 && line1.x1 >= line2.x2));
        else // Lines have the same angle, but are not on each other => they don't collide
            return false;
    } else { // Lines collide somewhere
        // ax + by + c = 0
        // dx + ey + f = 0
        // => y = (-(ax + c))/b
        // => x = (-(e * (-c)/b + f))/(d - e * a/b)

        var a = eqn1.a;
        var b = eqn1.b;
        var c = eqn1.c;
        var d = eqn2.a;
        var e = eqn2.b;
        var f = eqn2.c;

        var x = (-(e * (-c) / b + f)) / (d - e * a / b);
        var y = (-(a * x + c)) / b;

        if (line1.x1 < line1.x2)
            if (line2.x1 < line2.x2)
                if (line1.y1 < line1.y2)
                    if (line2.y1 < line2.y2)
                        return (line1.x1 <= x && line1.x2 >= x && line2.x1 <= x && line2.x2 >= x && line1.y1 <= y && line1.y2 >= y && line2.y1 <= y && line2.y2 >= y);
                    else
                        return (line1.x1 <= x && line1.x2 >= x && line2.x1 <= x && line2.x2 >= x && line1.y1 <= y && line1.y2 >= y && line2.y1 >= y && line2.y2 <= y);
                else if (line2.y1 < line2.y2)
                    return (line1.x1 <= x && line1.x2 >= x && line2.x1 <= x && line2.x2 >= x && line1.y1 >= y && line1.y2 <= y && line2.y1 <= y && line2.y2 >= y);
                else
                    return (line1.x1 <= x && line1.x2 >= x && line2.x1 <= x && line2.x2 >= x && line1.y1 >= y && line1.y2 <= y && line2.y1 >= y && line2.y2 <= y);
            else if (line1.y1 < line1.y2)
                if (line2.y1 < line2.y2)
                    return (line1.x1 <= x && line1.x2 >= x && line2.x1 >= x && line2.x2 <= x && line1.y1 <= y && line1.y2 >= y && line2.y1 <= y && line2.y2 >= y);
                else
                    return (line1.x1 <= x && line1.x2 >= x && line2.x1 >= x && line2.x2 <= x && line1.y1 <= y && line1.y2 >= y && line2.y1 >= y && line2.y2 <= y);
            else if (line2.y1 < line2.y2)
                return (line1.x1 <= x && line1.x2 >= x && line2.x1 >= x && line2.x2 <= x && line1.y1 >= y && line1.y2 <= y && line2.y1 <= y && line2.y2 >= y);
            else
                return (line1.x1 <= x && line1.x2 >= x && line2.x1 >= x && line2.x2 <= x && line1.y1 >= y && line1.y2 <= y && line2.y1 >= y && line2.y2 <= y);
        else if (line2.x1 < line2.x2)
            if (line1.y1 < line1.y2)
                if (line2.y1 < line2.y2)
                    return (line1.x1 >= x && line1.x2 <= x && line2.x1 <= x && line2.x2 >= x && line1.y1 <= y && line1.y2 >= y && line2.y1 <= y && line2.y2 >= y);
                else
                    return (line1.x1 >= x && line1.x2 <= x && line2.x1 <= x && line2.x2 >= x && line1.y1 <= y && line1.y2 >= y && line2.y1 >= y && line2.y2 <= y);
            else if (line2.y1 < line2.y2)
                return (line1.x1 >= x && line1.x2 <= x && line2.x1 <= x && line2.x2 >= x && line1.y1 >= y && line1.y2 <= y && line2.y1 <= y && line2.y2 >= y);
            else
                return (line1.x1 >= x && line1.x2 <= x && line2.x1 <= x && line2.x2 >= x && line1.y1 >= y && line1.y2 <= y && line2.y1 >= y && line2.y2 <= y);
        else if (line1.y1 < line1.y2)
            if (line2.y1 < line2.y2)
                return (line1.x1 >= x && line1.x2 <= x && line2.x1 >= x && line2.x2 <= x && line1.y1 <= y && line1.y2 >= y && line2.y1 <= y && line2.y2 >= y);
            else
                return (line1.x1 >= x && line1.x2 <= x && line2.x1 >= x && line2.x2 <= x && line1.y1 <= y && line1.y2 >= y && line2.y1 >= y && line2.y2 <= y);
        else if (line2.y1 < line2.y2)
            return (line1.x1 >= x && line1.x2 <= x && line2.x1 >= x && line2.x2 <= x && line1.y1 >= y && line1.y2 <= y && line2.y1 <= y && line2.y2 >= y);
        else
            return (line1.x1 >= x && line1.x2 <= x && line2.x1 >= x && line2.x2 <= x && line1.y1 >= y && line1.y2 <= y && line2.y1 >= y && line2.y2 <= y);


    }
}