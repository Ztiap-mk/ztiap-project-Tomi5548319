class GameObject extends Widget {
  constructor(canvas, x_mult, y_mult, width_mult, height_mult) {
    // Construct a Widget
    super(x_mult * canvas.width / 1000, y_mult * canvas.height / 1000, width_mult * canvas.width / 1000, height_mult * canvas.height / 1000);

  }

}