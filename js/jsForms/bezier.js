function Bezier (startPt,endPt,ctrlPt1,ctrlPt2){
	this.startPt = startPt;
	this.endPt = endPt;
	this.ctrlPt1 = ctrlPt1;
	this.ctrlPt2 = ctrlPt2;
	this.ID = "Line";
}

Bezier.prototype.draw = function(context){
	context.beginPath();
	context.moveTo(this.startPt.x,this.startPt.y);
	context.bezierCurveTo(this.ctrlPt1.x,this.ctrlPt1.y,this.ctrlPt2.x,this.ctrlPt2.y,this.endPt.x,this.endPt.y);
	context.stroke();
}

Bezier.prototype.pick = function(pos){
	if(this.startPt.pick(pos) == true || this.endPt.pick(pos) == true)
	{
		return true;
	}
	var ptList = []
	var lerpT = 0.5
	ptList[0] = this.startPt
	ptList[1] = this.ctrlPt1
	ptList[2] = this.ctrlPt2
	ptList[3] = this.endPt
	ptList[4] = Lerp(ptList[0],ptList[1],lerpT)
	ptList[5] = Lerp(ptList[1],ptList[2],lerpT)
	ptList[6] = Lerp(ptList[2],ptList[3],lerpT)
	ptList[7] = Lerp(ptList[4],ptList[5],lerpT)
	ptList[8] = Lerp(ptList[5],ptList[6],lerpT)
	ptList[9] = Lerp(ptList[7],ptList[8],lerpT)
	
	console.log(ptList[9])
	context.beginPath();
	context.arc(ptList[9].x,ptList[9].y,tol,0,Math.PI*2)
	context.stroke();

	if(ptList[9].pick(pos) == true)
	{
		return true;
	}

	var pickArea = new Area(ptList)
	return pickArea.pick(pos)

	return false;
}
Bezier.prototype.highlight = function(context){
	var ptList = [this.startPt,this.ctrlPt1,this.ctrlPt2,this.endPt]
	context.strokeStyle = "rgb(0,0,0)"
	context.setLineDash([1,3]);
	
	for (var i = 0; i < ptList.length; i++)
	{
		for(var j = 0; j < ptList.length; j ++)
		{	
			if(j != i)
			{
				context.beginPath(); 
				context.moveTo(ptList[i].x,ptList[i].y)
				context.lineTo(ptList[j].x,ptList[j].y)
				context.stroke();
			}
		}
	}

	
	context.setLineDash([0,0]); 
}

Bezier.prototype.translate = function(pos){
	var distX = this.startPt.x 
	var distY = this.startPt.y
	this.startPt.translate(pos);
	this.ctrlPt1.x += this.startPt.x - distX
	this.ctrlPt1.y += this.startPt.y - distY
	this.ctrlPt2.x += this.startPt.x - distX
	this.ctrlPt2.y += this.startPt.y - distY
	this.endPt.x += this.startPt.x - distX
	this.endPt.y += this.startPt.y - distY

}

Bezier.prototype.scale = function(rate){
	this.startPt.x *= rate
	this.startPt.y *= rate
	this.ctrlPt1.x *= rate
	this.ctrlPt1.y *= rate
	this.ctrlPt2.x *= rate
	this.ctrlPt2.y *= rate
	this.endPt.x *= rate;
	this.endPt.y *= rate;
	drawCall()
}

Bezier.prototype.drawScale = function(rate){
	context.beginPath();
	context.moveTo(this.startPt.x*rate,this.startPt.y*rate);
	context.bezierCurveTo(this.ctrlPt1.x*rate,this.ctrlPt1.y*rate,this.ctrlPt2.x*rate,this.ctrlPt2.y*rate,this.endPt.x*rate,this.endPt.y*rate);
	context.stroke();
}

Bezier.prototype.rotate = function(sin,cos,pt){
	var ptList = [this.startPt,this.ctrlPt1,this.ctrlPt2,this.endPt]
	var CoM = pt;
	for (var i = 0 ; i < ptList.length;i++){
		ptList[i].x += CoM.x*-1
		ptList[i].y += CoM.y*-1
		ptList[i].x = ((cos*ptList[i].x) - (sin*ptList[i].y));
		ptList[i].y = ((sin*ptList[i].x) + (cos*ptList[i].y));
		ptList[i].x += CoM.x
		ptList[i].y += CoM.y
	}
	
}

Bezier.prototype.drawRotate = function(sin,cos,pt){
	
	var ptList = [new Point(this.startPt.x , this.startPt.y),new Point (this.ctrlPt1.x,this.ctrlPt1.y),new Point (this.ctrlPt2.x,this.ctrlPt2.y),new Point(this.endPt.x , this.endPt.y)]
	var CoM = pt;
	for (var i = 0 ; i < ptList.length;i++){
		ptList[i].x += CoM.x*-1
		ptList[i].y += CoM.y*-1
		ptList[i].x = ((cos*ptList[i].x) - (sin*ptList[i].y));
		ptList[i].y = ((sin*ptList[i].x) + (cos*ptList[i].y));
		ptList[i].x += CoM.x
		ptList[i].y += CoM.y
	}
	context.beginPath();
	context.moveTo(ptList[0].x,ptList[0].y);
	context.bezierCurveTo(ptList[1].x,ptList[1].y,ptList[2].x,ptList[2].y,ptList[3].x,ptList[3].y);
	context.strokeStyle = "rgb(0,0,0)";
	context.stroke();
}

Bezier.prototype.getCoM = function(){
	return new Point ((this.startPt.x+this.endPt.x+this.ctrlPt2.y+this.ctrlPt1.x)/4,(this.startPt.y+this.endPt.y+this.ctrlPt2.y+this.ctrlPt1.y)/4)
}