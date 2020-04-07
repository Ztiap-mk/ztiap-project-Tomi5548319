class App extends Widget {
  constructor(element) {
    var canvas = window.document.getElementById(element)
    var context = canvas.getContext("2d")
	
    super(0, 0, canvas.width, canvas.height)
	
    this.canvas = canvas
    this.context = context
	
	this.keys = []
  }
  
  // Redefine draw
  ondraw(context) {
	// TODO change to clip from the game
	var backgroundImg = new Image()
	backgroundImg.src = "objects/background.png"
	
	context.drawImage(backgroundImg, 0, 0, this.canvas.width, this.canvas.height)
  }

  
  // Redraw everything (notify observers)
  update() {
    this.draw(this.context)
	this.keyCheck(1)
  }
  

  // Initialize application handlers
  start() {
    var app = this

    // Mouse click handler
    window.onclick = function (event) {
      var point = {
        x: event.layerX,
        y: event.layerY,
      }
      // Send click message to all observers
      app.click(point)
    }

    // Key down handler
    window.onkeydown = function (event) {

	  //console.log(event.key)
	
	  //app.onkeydown(event)
	  app.keys[event.key] = true;
	
      // Send key message to observers
      //app.key(event)
      return false
    }
	
	// Key up handler
    window.onkeyup = function (event) {

	  //app.onkeyup(event)
	  app.keys[event.key] = false;
	
      // Send key message to observers
      //app.key(event)
      return false
    }

    // Update 30times per second
    setInterval(function () {
      app.update()
    }, 1000 / 60)
  }
}