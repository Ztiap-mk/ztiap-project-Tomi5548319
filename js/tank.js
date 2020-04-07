class Tank extends GameObject {
	// Initialization
	// TODO increment id, don't take it as a parameter
	constructor(canvas, x_mult, y_mult, width_mult, height_mult, angle, imgSrc) {
		
		// Construct a Widget
		super(canvas, x_mult, y_mult, width_mult, height_mult);
		
		this.imgSrc = imgSrc
		this.canvas = canvas
		
		this.movementSpeed = canvas.width/10/10/5
		this.rotationSpeed = 2
		
		this.angle = angle
		this.dx = Math.cos(this.angle * Math.PI / 180) * (-1)
		this.dy = Math.sin(this.angle * Math.PI / 180) * (-1)
		this.corners = []
		
		this.updateCorners()
	}

	// Redefine draw
	ondraw(context) {
		var tank = this
		
		var img = new Image()
		img.src = tank.imgSrc
		img.onload = function (){
			context.save()
		
			// Move the image
			context.translate(tank.x, tank.y)
		
			// Rotate the image
			context.rotate(tank.angle * Math.PI / 180)

			// Render the image
			context.drawImage(img, -tank.width / 1.5, -tank.height / 2, tank.width, tank.height)
			
			context.restore()
		}
		
		//var context = app.context
		
		for(var i in this.corners){
			context.fillStyle = "black"
			context.beginPath();
			context.arc(this.corners[i].x, this.corners[i].y, 1, 0, Math.PI * 2);
			context.closePath();
			context.fill();
		}
		
	}
	
	// Movement logic
	move(direction) {		
		this.x += direction * this.movementSpeed * this.dx
		this.y += direction * this.movementSpeed * this.dy
		
		this.updateCorners()
	}
	
	rotate(direction){
		this.angle += direction * this.rotationSpeed
		if(this.angle < 0)
			this.angle += 360

		this.angle %= 360;
		
		this.dx = Math.cos(this.angle * Math.PI / 180) * (-1)
		this.dy = Math.sin(this.angle * Math.PI / 180) * (-1)
		
		this.updateCorners()
	}
	
	updateCorners(){
		this.corners[0] = ({x: (this.x - (this.dy * (this.height/2)) + (this.dx * (this.width/2))), y: (this.y + this.dy * (this.width/2) + this.dx * (this.height/2))}) // RIGHT FRONT
		this.corners[1] = ({x: (this.x + (this.dy * (this.height/2)) + (this.dx * (this.width/2))), y: (this.y + this.dy * (this.width/2) - this.dx * (this.height/2))}) // LEFT FRONT
		this.corners[2] = ({x: (this.x - (this.dy * (this.height/2)) - (this.dx * (this.width/3))), y: (this.y - this.dy * (this.width/3) + this.dx * (this.height/2))}) // RIGHT REAR
		this.corners[3] = ({x: (this.x + (this.dy * (this.height/2)) - (this.dx * (this.width/3))), y: (this.y - this.dy * (this.width/3) - this.dx * (this.height/2))}) // LEFT REAR
		
		for(var i in this.corners){
			if(this.corners[i].x < 0)
				this.x += this.movementSpeed * Math.abs(this.dx)
			else if(this.corners[i].x > canvas.width)
				this.x -= this.movementSpeed * Math.abs(this.dx)
			
			if(this.corners[i].y < 0)
				this.y += this.movementSpeed * Math.abs(this.dy)
			else if(this.corners[i].y > canvas.height)
				this.y -= this.movementSpeed * Math.abs(this.dy)
				
		}
	}
	
}