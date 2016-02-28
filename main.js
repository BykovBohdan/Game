window.onload = function(){
	this.game = new Game();
	game.start();
	
	
	function render(){
	    //game.clearCanvas();
		game.draw();
	}
	
	setTimeout(render, 100); 
	
}


window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

