//Some static global variables
var dark;
var light;
var horizon;
var ripplecolor = 130;
var dropcolor = 170;

var maxDrops = 600;
var drops = [];
var rainspeed = 2;
var ripplegrowth = 7;

function setup() {
  createCanvas(375, 667);
  dark =color(0);
  light = color(183, 200, 204);
  horizon = height/3;

  for(var i =0; i< maxDrops; i++){
    var x = int(random(0, width));
    var y = -int(random(height*2));
    var z = horizon+int(random(horizon*2))
    var d = 1280;
    drop = new Drop(x, y, z, d);
    drops.push(drop);
  }
}

function draw() {
  for(var i =0; i<= height; i++){
    var iVal = map(i, 0, height, 0, 1);
    var c = lerpColor(light, dark, iVal);
    stroke(c);
    line(0, i, width, i);
  }

  for(var i =0; i<drops.length; i++){
    drops[i].fall();
  }

}

//Our drop object

//This constructor has all the information about our raindrops
var Drop = function(x, y, z, d){
  this.x = x;
  this.y = y;
  this.z = z;
  this.d = d;
  this.acel = rainspeed;
  this.d1 = d;
  this.prev_y = y;
  this.ripple = 0;
}

//This is a function we can call for each drop to draw it falling
Drop.prototype.fall = function(){
  if(this.y > 0){
    this.acel+=0.25;
  }
  
  stroke(dropcolor, dropcolor, dropcolor,  map(this.z, 0, height, 0, 255));
  strokeWeight(2);
  if(this.y < this.z){
    this.y +=(this.acel+rainspeed);
    line(this.x, this.prev_y, this.x, this.y);
    this.prev_y = this.y;
  }
  
  else{
    noFill();
    stroke(ripplecolor, ripplecolor, ripplecolor, ripplecolor-map(this.ripple, 0, this.d, 0, 255));
    strokeWeight(map(this.ripple, 0, this.d, 0, rainspeed));
    this.d = this.d1 + (this.y - height)*rainspeed;
    ellipse(this.x, this.y, this.ripple/5, this.ripple/20);
    this.ripple+=ripplegrowth;
        if(this.ripple > this.d){
          this.ripple = 0;
          this.acel = 0;
          this.x = random(width);
          this.y = random(height*2);
          this.prev_y = this.y;
          this.d = this.d1;
        }
  }
  
}
