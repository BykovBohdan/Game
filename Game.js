//Bykov Bohdan 28.12.15
function Game(){
    this.animPlay = true;
};

Game.prototype.start = function(){
	
	var min = 0,
	    max = 1,
		me = this;
		
		
	Game.canvas = document.getElementById("myCanvas");
    Game.canvasContext = Game.canvas.getContext("2d");
	Game.canvas.addEventListener('click', function(event){
		me.getClickXY(event)
	}, false);
	this.randomLoc = Math.floor(min + Math.random() * (max + 1 - min)); 
	
	Game.bgImg = new Image();
    Game.bgImg.src = "img/background2.png";
	Game.cardImg = new Image();
    Game.cardImg.src = "img/back.png";
	Game.image = new Image();
    Game.image.src = "img/" + this.randomLoc + ".png";
	
	Game.opencard = new Audio();
	Game.opencard.src = "audio/opencard.mp3";
	Game.ost= new Audio();
	Game.ost.src = "audio/ost.mp3";
	Game.ost.play();
	Game.ost.volume = 0.2;
	Game.win = new Audio();
	Game.win.src = "audio/win.mp3"
	Game.win.volume = 0.2;
	Game.lost = new Audio();
	Game.lost.src = "audio/lose.mp3"
	Game.lost.volume = 0.2;
};

Game.prototype.draw = function(){
	
    this.drawImage(Game.bgImg, { x : 0, y : 0 });
	Game.canvasContext.font = "bold 50px sans-serif";
    Game.canvasContext.fillText("where's the ACE?", 180, 50);
	Game.canvasContext.strokeStyle = "white";
	Game.canvasContext.strokeText("where's the ACE?", 180, 50);
	this.drawImage(Game.cardImg, { x : 150, y : 100 }); 
	this.drawImage(Game.cardImg, { x : 450, y : 100 });
	
};
	
Game.prototype.getClickXY = function(event) {
    
    var clickX = ( !event.layerX ? event.offsetX : event.layerX) + 1;
    var clickY = ( !event.layerX ? event.offsetY : event.layerY) + 1;
	
    Game.ost.pause();    
	
	 if (clickX <= (Game.canvas.width/2) &&  this.animPlay ) {       
       this.animation(150,100,450);
	   Game.opencard.play(); 
	} //end if
	if (clickX >= (Game.canvas.width/2) &&  this.animPlay) { console.log(Game.canvas.width/2);
	   this.animation(450,100,150);
	   Game.opencard.play();
	} // end if

  };
Game.prototype.clearCanvas = function () {
    Game.canvasContext.clearRect(0, 0, Game.canvas.width, Game.canvas.height); 
};

Game.prototype.drawImage = function (sprite, position) {
    Game.canvasContext.save();
    Game.canvasContext.translate(position.x, position.y);
    Game.canvasContext.drawImage(sprite, 0, 0, sprite.width, sprite.height,
        0, 0, sprite.width, sprite.height);
    Game.canvasContext.restore();
};

Game.prototype.coordinatesCanvas = function() {
    var box = Game.canvas.getBoundingClientRect();
	
    var body = document.body;
    var docElem = document.documentElement;

    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    
    return { top: Math.round(top), left: Math.round(left) } 
	
};

Game.prototype.gameOver = function() {
    var text;
        if (this.randomLoc > 0) {
          var text = " YOU WIN";
	      Game.win.play(); 
	      Game.canvasContext.shadowColor = "rgb(72, 187, 19)";
    } //end if
        else {
          var text = "YOU LOST";
          Game.lost.play();
	      Game.canvasContext.shadowColor = "#F00";
   }//end else
	   
     Game.canvasContext.font = 'bold 50px sans-serif';
     Game.canvasContext.shadowOffsetX = 1;
     Game.canvasContext.shadowOffsetY = 0.1;
     Game.canvasContext.shadowBlur = 5;
     Game.canvasContext.fillText(text, Game.canvas.width/2-135, Game.canvas.height/2);
     document.getElementById("btn1").style.display = "block";
	
};

Game.prototype.restart = function() {
	console.log("if you want the full version - take to work))");
	 this.animPlay = true;
	 Game.canvasContext.shadowColor = "rgb(255, 255, 255)";
	 Game.canvasContext.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
	 Game.canvasContext.shadowOffsetX = 0;
     Game.canvasContext.shadowOffsetY = 0;
     Game.canvasContext.shadowBlur = 0;
	
	game.draw();
	Game.ost.pause();
	Game.lost.pause();
	Game.win.pause(); 
	
	document.getElementById("btn1").style.display = "none";
    	
	game.start();
	
	
    
};


Game.prototype.animation = function(xPos,yPos,x2Pos) {
    var msPerFrame = 65,
        width = 200,
        height = 342,
        frames = 9,
        currentFrame = 0, 
        lastUpdateTime = 0,
        acDelta = 0;	
	
    var redraw = function(){ 
	
		requestAnimationFrame(redraw);	
		
    var delta = Date.now() - lastUpdateTime;
        if (acDelta > msPerFrame) {
			acDelta = 0;
		Game.canvasContext.clearRect(xPos, yPos, width, height);
	    Game.canvasContext.drawImage(Game.bgImg, 0, 0);
	    Game.canvasContext.drawImage(Game.cardImg, x2Pos, yPos);
        Game.canvasContext.drawImage(Game.image, 0, height * currentFrame, width, height, xPos, yPos, width, height);
        currentFrame++; 
		console.log("this1 = " + this ); //window
		
		var context = function() {
          console.log("this2 = " + this ); // game
          this.gameOver();
		  this.animPlay = false;
		}
        context.apply(game);
        } //end if
                if (currentFrame < frames) {
					acDelta += delta;
				}	// end if				
				 lastUpdateTime = Date.now();  
				
 
        
    }  
	
	requestAnimationFrame(redraw);
	
};
