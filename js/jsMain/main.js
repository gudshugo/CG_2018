var canvas = document.getElementById('canvasDoPoder');
var context = canvas.getContext('2d');

var drawBuffer = [];
var drawPoint = false;
var drawLine = 0;
var drawArc = 0;
var drawBezier = 0;
var drawArea = 0;
var tol = 10;

drawCall = function ()
{
	
	context.fillStyle = "rgb(255,255,255)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	if(drawBuffer.length > 0){
		for (var i = 0; i < drawBuffer.length; i++){
			context.setLineDash([0,0]);
			drawBuffer[i].draw(context);
		}
	}

}

setAllFalse = function()
{
	drawPoint = false;
	drawLine = 0;
	drawArc = 0;
	drawBezier = 0;
	drawArea = 0;
	scale = 0
	rotation = 0
}

newPoint = function()
{
	if(drawPoint == false){
		setAllFalse();
		drawPoint = true;
	}
	else{
		drawPoint = false;
	}
}

newLine = function()
{
	if(drawLine == 0){
		setAllFalse();
		drawLine = 1;
	}
}

newArc = function()
{
	if(drawArc == 0){
		setAllFalse();
		drawArc = 1;
	}
}

newBezier = function()
{
	if(drawBezier == 0){
		setAllFalse();
		drawBezier = 1;
	}
}

newArea = function()
{
	if(drawArea == 0){
		setAllFalse();
		drawArea = 1;
	}
}

scaleFlag = function()
{
	if(scale == 0){
		setAllFalse();
		scale = 1;
	}
}

rotationFlag = function()
{
	if(rotation == 0 && pick != null){
		setAllFalse();
		rotation = 1;
	}
}

drawCall();