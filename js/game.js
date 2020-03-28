var tank = []

/////  MODEL  /////
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

var keys = {}

/////  VIEW  /////

function drawTanks(){
	var tank1img = new Image()
	tank1img.src = "objects/tank_green.svg"
	tank1img.onload = function (){
		ctx.save()
		
		ctx.translate(tank[0].x, tank[0].y)
		
		// Rotate the image
		ctx.rotate(tank[0].rotation * Math.PI / 180)

		// Render the image
		ctx.drawImage(tank1img, -tank[0].width / 1.5, -tank[0].height / 2, tank[0].width, tank[0].height)

		// Restore canvas transformation
		ctx.restore()
	}
	
	var tank2img = new Image()
	tank2img.src = "objects/tank_red.svg"
	tank2img.onload = function (){
		ctx.save()
		
		ctx.translate(tank[1].x, tank[1].y)
		
		// Rotate the image
		ctx.rotate(tank[1].rotation * Math.PI / 180)

		// Render the image
		ctx.drawImage(tank2img, -tank[1].width / 1.5, -tank[1].height / 2, tank[1].width, tank[1].height)

		// Restore canvas transformation
		ctx.restore()
	}
}

function displayGame(){
	drawBackground()
	drawTanks()
}

/////  CONTROLLER  /////

function gameLoop() {
	detectKeys()
	
	displayGame()
	/*if(tick % 60 == 0)
		console.log(tick / 60)*/
}

function detectKeys(){
	if(keys[65]) // A
		tank[0].rotate(-1)
	if(keys[68]) // D
		tank[0].rotate(1)
	if(keys[87]) // W
		tank[0].move(1)
	if(keys[83]) // S
		tank[0].move(-1)
	
	if(keys[37]) // LEFT
		tank[1].rotate(-1)
	if(keys[39]) // RIGHT
		tank[1].rotate(1)
	if(keys[38]) // UP
		tank[1].move(1)
	if(keys[40]) // DOWN
		tank[1].move(-1)
}

function mouseClickGame(event) {
  var x = event.pageX - canvas.offsetLeft
  var y = event.pageY - canvas.offsetTop

  console.log("[" + x + ";" + y + "]")
}

function addTanks(){
	tank.push(new Tank(0))
	tank.push(new Tank(1))
}

function setGameScene(){
	addTanks()
}

// Initialization
function startGame(){
	screen = 2
	canvas = document.getElementById("canvas")
	ctx = canvas.getContext("2d")
	canvas.onclick = mouseClickGame
	
	setGameScene()
}

// Handle keyboard events
window.onkeydown = function(event) {
  keys[event.keyCode] = true;
  console.log(keys);
};
window.onkeyup = function(event) {
  keys[event.keyCode] = false;
};