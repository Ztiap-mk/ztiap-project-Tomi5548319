class Box extends GameObject {
	constructor(canvas, boxType, x_mult, y_mult, width_mult, height_mult) {
    // Construct Widget
    super(canvas, x_mult, y_mult, width_mult, height_mult)
	
	this.type = boxType
	
	switch(boxType){
		case "iron":
			this.src = "objects/box_iron.png"
			break
		case "wood":
			this.src = "objects/box_wooden.png"
			break
		default:
			this.src = "objects/wall.png"
	}
  }
  
  // Redefine ondraw function
  ondraw(context) {
	var box = this

	var img = new Image()
	img.src = box.src
	img.onload = function (){
		context.drawImage(img, box.x, box.y, box.width, box.height)
	}
  }
}