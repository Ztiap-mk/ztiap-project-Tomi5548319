class GameObject extends Widget {
  constructor(canvas, x_mult, y_mult, width_mult, height_mult) {
    // Construct a Widget
    super(x_mult * canvas.width / 1600, y_mult * canvas.height / 900, width_mult * canvas.width / 1600, height_mult * canvas.height / 900);

  }

}