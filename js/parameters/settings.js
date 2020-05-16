class Settings {
    static resolution = "medium";

    static changeResolution = function(parent, new_size) {
        for (var child of parent.nodes) {
            if (child instanceof Text && (child.id === "small" || child.id === "medium" || child.id === "big") && child.id !== new_size)
                child.selected = false;
        }

        switch (new_size) {
            case "small":
                Settings.resolution = "small";
                parent.canvas.width = 800;
                parent.canvas.height = 450;
                break;
            case "big":
                Settings.resolution = "big";
                parent.canvas.width = 1600;
                parent.canvas.height = 900;
                break;
            default:
                Settings.resolution = "medium";
                parent.canvas.width = 1200;
                parent.canvas.height = 675;
        }
    }
}