function Arc (center,radius,Start,end){
	this.center = center;
	this.radius = radius;
	this.Start = Start;
	this.end = end;
	this.ID = "Arc";
}

Arc.prototype.draw = function (context){
	context.beginPath();
	context.arc(this.center.x,this.center.y,this.radius,this.Start,this.end,true);
	context.stroke();
}

Arc.prototype.pick = function(pt2){
		var dist = calcDistancia(pt2,this.center)
		if(pt2.y > this.center.y){
			//console.log ("mouse",Math.acos( (pt2.x-this.center.x)/dist ) * (180/Math.PI))
		}
		else
		{
			//console.log ("mouse",-Math.acos( (pt2.x-this.center.x)/dist ) * (180/Math.PI))
		}

		if(dist > this.radius-tol && dist < this.radius+tol){
			return true;
		}
		return false;
}

Arc.prototype.highlight = function(context){
	context.rect(this.center.x - this.radius, this.center.y - radius,radius*2,radius*2);
	context.strokeStyle = "rgb(0,0,0)"
	context.setLineDash([1,3]); 
	context.stroke();
	context.setLineDash([0,0]); 

}

Arc.prototype.translate = function(pt2){
	this.center.translate(pt2)
}

Arc.prototype.scale = function(rate){
	this.radius *= rate;
	drawCall()
}

Arc.prototype.drawScale = function (rate){
	context.beginPath();
	context.arc(this.center.x,this.center.y,this.radius*rate,this.Start,this.end,true);
	context.stroke();
}

Arc.prototype.rotate = function(sin,cos,pt){
	var pt1 = new Point(Math.cos(this.Start)*this.radius + this.center.x,Math.sin(this.Start)*this.radius + this.center.y)
	var pt2 = new Point(Math.cos(this.end)*this.radius + this.center.x,Math.sin(this.end)*this.radius + this.center.y)
	var CoM = pt

	pt1.x -= CoM.x
	pt1.y -= CoM.y
	pt2.x -= CoM.x
	pt2.y -= CoM.y

	pt1.x = cos*pt1.x - sin*pt1.y
	pt1.y = sin*pt1.x + cos*pt1.y

	pt2.x = cos*pt2.x - sin*pt2.y
	pt2.y = sin*pt2.x + cos*pt2.y

	pt1.x += CoM.x
	pt1.y += CoM.y
	pt2.x += CoM.x
	pt2.y += CoM.y

	if(pt1.y > this.center)
		{
			if(pt2.y > this.center.y)
			{
				this.Start = Math.acos((pt1.x-this.center.x)/radius)
				this.end = Math.acos((pt2.x-this.center.x)/radius)
			}
			else
			{
				this.Start = Math.acos((pt1.x-this.center.x)/radius)
				this.end = -Math.acos((pt2.x-this.center.x)/radius)	
			}
		}
		else
		{
			if(pt2.y > this.center.y)
			{
				this.Start = -Math.acos((pt1.x-this.center.x)/radius)
				this.end = Math.acos((pt2.x-this.center.x)/radius)
			}
			else
			{
				this.Start = -Math.acos((pt1.x-this.center.x)/radius)
				this.end = -Math.acos((pt2.x-this.center.x)/radius)
			}
		}
	drawCall()
}

Arc.prototype.drawRotate = function(sin,cos,pt){
	var pt1 = new Point(Math.cos(this.Start)*this.radius + this.center.x,Math.sin(this.Start)*this.radius + this.center.y)
	var pt2 = new Point(Math.cos(this.end)*this.radius + this.center.x,Math.sin(this.end)*this.radius + this.center.y)
	var CoM = pt

	pt1.x -= CoM.x
	pt1.y -= CoM.y
	pt2.x -= CoM.x
	pt2.y -= CoM.y

	pt1.x = cos*pt1.x - sin*pt1.y
	pt1.y = sin*pt1.x + cos*pt1.y

	pt2.x = cos*pt2.x - sin*pt2.y
	pt2.y = sin*pt2.x + cos*pt2.y

	pt1.x += CoM.x
	pt1.y += CoM.y
	pt2.x += CoM.x
	pt2.y += CoM.y

	context.beginPath()
	if(pt1.y > this.center)
		{
			if(pt2.y > this.center.y)
			{
				context.arc(this.center.x,this.center.y,this.radius, Math.acos((pt1.x-this.center.x)/radius),Math.acos((pt2.x-this.center.x)/radius),true)
			}
			else
			{
				context.arc(this.center.x,this.center.y,this.radius, Math.acos((pt1.x-this.center.x)/radius),-Math.acos((pt2.x-this.center.x)/radius),true)
			}
		}
		else
		{
			if(pt2.y > this.center.y)
			{
				context.arc(this.center.x,this.center.y,this.radius, -Math.acos((pt1.x-this.center.x)/radius),Math.acos((pt2.x-this.center.x)/radius),true)
			}
			else
			{
				context.arc(this.center.x,this.center.y,this.radius, -Math.acos((pt1.x-this.center.x)/radius),-Math.acos((pt2.x-this.center.x)/radius),true)
			}
		}
	context.stroke();
}