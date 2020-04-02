var canvas
var ctx
var tick = 0
var screen = 1
var sound = "on"

/////////////////////////////////////////////////// MAIN MENU ///////////////////////////////////////////////////

/////  MODEL  /////
var scene = []

function Window(x, y, width, height) {
  // Constructor for rectangular area
  this.x = x
  this.y = y
  this.width = width
  this.height = height
}

Window.prototype = {
  clicked: function() {
    alert("Clicked");
  }
}

/////  VIEW  /////
function display(){
	drawBackground()
	drawObjects()
}

// TODO change to clip from the game
function drawBackground(){
	var backgroundImg = new Image()
	backgroundImg.src = "objects/background.png"
	backgroundImg.onload = function (){
		ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height)
	}
}

function drawObjects(){
	// Play button
	var buttonPlayImg = new Image()
	buttonPlayImg.src = "objects/button_play.png"
	buttonPlayImg.onload = function (){
		ctx.drawImage(buttonPlayImg, scene[0].x, scene[0].y, scene[0].width, scene[0].height)
	}
	
	// Settings button
	var buttonSettingsImg = new Image()
	buttonSettingsImg.src = "objects/button_settings.png"
	buttonSettingsImg.onload = function (){
		ctx.drawImage(buttonSettingsImg, scene[1].x, scene[1].y, scene[1].width, scene[1].height)
	}
	
	// Sound icon
	var iconSoundImg = new Image()
	switch(sound){
		case "on":
			iconSoundImg.src = "objects/sound_on.svg";
			break;
		case "off":
			iconSoundImg.src = "objects/sound_off.svg";
			break;
	}
	
	iconSoundImg.onload = function (){
		ctx.drawImage(iconSoundImg, scene[2].x, scene[2].y, scene[2].width, scene[2].height)
	}
}

/////  CONTROLLER  /////
function mainLoop() {
	switch(screen){
		case 1:
			mainMenuLoop()
			break
		case 2:
			gameLoop()
			break
	}
	
	tick++
	
	requestAnimationFrame(mainLoop);
}

function mainMenuLoop(){
	tick++
	display()
}

function mouseClick(event) {
  var x = event.pageX - canvas.offsetLeft
  var y = event.pageY - canvas.offsetTop

  // Test each square for click
  for (var i in scene) {
    var window = scene[i]
    if (x > window.x && x < window.x + window.width &&
        y > window.y && y < window.y + window.height) {
        window.clicked()
    }
  }
}

// TODO set clicked methods
function addPlayButton(){
	scene.push(new Window(canvas.width/2.75, canvas.height/4, canvas.width/4, canvas.height/7))
	scene[scene.length-1].clicked = startGame
}

function addSettingsButton(){
	scene.push(new Window(canvas.width/2.75, canvas.height/2, canvas.width/4, canvas.height/7))
	scene[scene.length-1].clicked = function(){
		console.log("Settings clicked")
	}
}

function addSoundIcon(){
	scene.push(new Window(canvas.width/1.05, canvas.height/10/10, canvas.width/16/2, canvas.height/9/2))
	scene[scene.length-1].clicked = function(){
		switch(sound){
			case "on":
				sound = "off";
				console.log("Sound muted")
				break;
			case "off":
				sound = "on";
				console.log("Sound on")
				break;
		}
	}
}

// Saves each objest into scene array
function setScene(){
	screen = 1
	addPlayButton()
	addSettingsButton()
	addSoundIcon()
}

// Initialization
window.onload = function(){
	canvas = document.getElementById("canvas")
	ctx = canvas.getContext("2d")
	canvas.onclick = mouseClick
	
	setScene()
	
	requestAnimationFrame(mainLoop)
}