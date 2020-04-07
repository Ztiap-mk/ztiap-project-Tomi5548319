function prepareTanks(canvas){
	var nodes = []
	
	var width = 75
	var height = 50
	
	// Add tanks
	var tank1 = new Tank(canvas, width/2, height/1.5, width, height, 270, "objects/tank_green.svg")
	tank1.onkey = function() {
		
		if(app.keys["a"] === true)
			this.rotate(-1)
		if(app.keys["d"] === true)
			this.rotate(1)
		if(app.keys["w"] === true)
			this.move(1)
		if(app.keys["s"] === true)
			this.move(-1)
		
	}
	nodes.push(tank1)
	
	var tank2 = new Tank(canvas, 1600 - width/2, 900 - height/1.5, width, height, 90, "objects/tank_red.svg")
	tank2.onkey = function() {
		
		if(app.keys["ArrowLeft"] === true)
			this.rotate(-1)
		if(app.keys["ArrowRight"] === true)
			this.rotate(1)
		if(app.keys["ArrowUp"] === true)
			this.move(1)
		if(app.keys["ArrowDown"] === true)
			this.move(-1)
	}
	nodes.push(tank2)
	
	return nodes
}