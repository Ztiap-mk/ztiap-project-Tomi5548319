class Tank {
	// Initialization
	// TODO increment id, don't take it as a parameter
	constructor(id) {
		// Common properties
		this.width = canvas.width/10/2.5
		this.height = canvas.height/10/2
		this.rotationSpeed = 2
		this.movementSpeed = canvas.width/10/10/5
		this.id = id
		
		/*console.log("x = " + this.corners[0].x + "; y = " + this.corners[0].y)
		
		this.corners[0].x = 1
		this.corners[0].y = 2
		
		console.log("x = " + this.corners[0].x + "; y = " + this.corners[0].y)*/

		switch(id){
			case 0:
				this.x = this.width/2 //canvas.width/10/4
				this.y = this.height/2 //canvas.height/10/2
				this.rotation = 270
				this.dx = 0
				this.dy = 1
				break
			case 1:
				this.x = canvas.width - this.width/2 //canvas.width/100 * 97
				this.y = canvas.height - this.height/2 //canvas.height/100 * 95
				this.rotation = 90
				this.dx = 0
				this.dy = -1
				break
		}
		
		this.corners = []
		this.corners.push({x: (this.x - (this.dy * (this.width/2)) + (this.dx * (this.height/1.5))), y: (this.y + this.dy * (this.height/1.5) + this.dx * (this.width/2))}) // RIGHT FRONT
		this.corners.push({x: (this.x + (this.dy * (this.width/2)) + (this.dx * (this.height/1.5))), y: (this.y + this.dy * (this.height/1.5) - this.dx * (this.width/2))}) // LEFT FRONT
		this.corners.push({x: (this.x - (this.dy * (this.width/2)) - (this.dx * (this.height/3))), y: (this.y - this.dy * (this.height/3) + this.dx * (this.width/2))}) // RIGHT REAR
		this.corners.push({x: (this.x + (this.dy * (this.width/2)) - (this.dx * (this.height/3))), y: (this.y - this.dy * (this.height/3) - this.dx * (this.width/2))}) // LEFT REAR
	}
	
	// Movement logic
	move(direction) {
		this.x += direction * this.movementSpeed * this.dx
		this.y += direction * this.movementSpeed * this.dy
		
		this.correctPosition()
	}
	
	rotate(direction){

		this.rotation += direction * this.rotationSpeed
		if(this.rotation < 0)
			this.rotation += 360

		this.rotation %= 360;
		
		this.dx = Math.cos(this.rotation * Math.PI / 180) * (-1)
		this.dy = Math.sin(this.rotation * Math.PI / 180) * (-1)
		
		this.correctPosition()
	}
	
	correctPosition(){
		this.updateCornerPositions()
		
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
	
	updateCornerPositions(){
		this.corners[0] = {x: (this.x - (this.dy * (this.width/2)) + (this.dx * (this.height/1.5))), y: (this.y + this.dy * (this.height/1.5) + this.dx * (this.width/2))} // RIGHT FRONT
		this.corners[1] = {x: (this.x + (this.dy * (this.width/2)) + (this.dx * (this.height/1.5))), y: (this.y + this.dy * (this.height/1.5) - this.dx * (this.width/2))} // LEFT FRONT
		this.corners[2] = {x: (this.x - (this.dy * (this.width/2)) - (this.dx * (this.height/3))), y: (this.y - this.dy * (this.height/3) + this.dx * (this.width/2))} // RIGHT REAR
		this.corners[3] = {x: (this.x + (this.dy * (this.width/2)) - (this.dx * (this.height/3))), y: (this.y - this.dy * (this.height/3) - this.dx * (this.width/2))} // LEFT REAR
	}
}