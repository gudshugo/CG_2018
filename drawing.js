var leitorDeCSV = new FileReader();

window.onload = function init() {
	leitorDeCSV.onload = readFile;
}

function pegaCSV(inputFile) {
	var file = inputFile.files[0];
 	leitorDeCSV.readAsText(file);
}

function readFile(evt) {

	var fileArr = evt.target.result.split('\n');
	
	var result,type,x1,x2;
	var points = [];
	var response = [];
	
	console.log(fileArr);

	for (var i=0; i<fileArr.length; i++) {
		var fileLine = fileArr[i].split(',');
			for (var j=0; j<fileLine.length; j++) {
				result = typeVerify(fileLine[j].trim());

				if(result){
					points.push(fileLine[j].trim());
				}else{
					type = fileLine[0].trim();
				}

			}
			console.log(type);
			console.log(points);
			DrawingEverything(type, points);
			points = [];
		}
}

function typeVerify(valor) {

  var line = "Line";
  var polygon = "Polygon";
  var bezier = "Bezier";
  var arc = "Arc";
  var text = "Text";

  if (valor.match(line) || valor.match(polygon) || valor.match(bezier) || valor.match(arc) || valor.match(text)) {
    return false;
  }else{
	return true;
  }
};   

document.getElementById('uploadFile').onclick = function() {
    document.getElementById('getFile').click();
};

function DrawingEverything(type, points){

	switch(type){
		case "Line":
			drawingStroke(type, points);
			break;
		case "Polygon":
			drawingPolygon(type, points);
			console.log('entrou na polygon');
			break;	
		case "Bezier":
			drawingBezierCurve(type, points);
			break;
		case "Arc":
			drawingCircleArc(type, points);
			break;
		case "Text":
			drawingText(type, points);
			break;

	};
}

function getContext(){
	var c = document.getElementById("canvasDoPoder");
	var ctx = c.getContext("2d");
	
	return ctx;
}

function drawingStroke(type, points){
	
	var ctx = getContext();

	ctx.beginPath();
	ctx.moveTo(points[0],points[1]);
	ctx.lineTo(points[2],points[3]);
	ctx.strokeStyle="red";
	ctx.closePath();
	ctx.stroke();
}

function drawingPolygon(type, points){

	var ctx = getContext();

		ctx.fillStyle = '#f00';
		ctx.beginPath();
	    ctx.moveTo(points[0],points[1]);
	    ctx.lineTo(points[2],points[3]);
	    ctx.lineTo(points[4],points[5]);
		ctx.closePath();
		ctx.fill();

}

function drawingBezierCurve(type, points){
	
	var ctx = getContext();

	ctx.beginPath();
	ctx.moveTo(points[0],points[1]);
	ctx.bezierCurveTo(points[2],points[3],points[4],points[5],points[6],points[7]);
	ctx.stroke();
}

function drawingCircleArc(type, points){

	var ctx = getContext();

	ctx.beginPath();
	ctx.arc(points[0],points[1],points[2],points[3],Math.PI);
	ctx.stroke();
}

function drawingText(type, points){

	var c = document.getElementById("canvasDoPoder");
	var ctx = c.getContext("2d");


	ctx.font = "30px Verdana";
	var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
	gradient.addColorStop("0", "magenta");
	gradient.addColorStop("0.5", "blue");
	gradient.addColorStop("1.0", "red");
	ctx.fillStyle = gradient;
	ctx.fillText(points[0], points[1], points[2]);
}