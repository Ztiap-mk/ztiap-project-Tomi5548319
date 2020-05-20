class Settings {
    // Hidden settings
    static showHitboxes = false;
    static gamePaused = false;

    // General settings
    static resolution = "medium";

    static sound = {
        muted: false,
        volume: 0.3
    }

    static music = {
        muted: false,
        volume: 0.3
    }

    // Player controls
    static player1_forward = "w";
    static player1_backward = "s";
    static player1_left = "a";
    static player1_right = "d";
    static player1_shoot = "c";

    static player2_forward = "ArrowUp";
    static player2_backward = "ArrowDown";
    static player2_left = "ArrowLeft";
    static player2_right = "ArrowRight";
    static player2_shoot = "l";

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