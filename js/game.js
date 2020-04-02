var tank = []

/////  MODEL  /////

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