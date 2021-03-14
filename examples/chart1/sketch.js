var plainFont;
var boldFont

var chartLeft = 45;
var chartRight = 325;

 var barWidth = 18; 

var chartTop = 130;
var chartBottom = 280;

var legendHigh = 8;
var legendLow = 0;

var dark;
var light;

var precipitation = [
  7.5, 7.8, 6.2, 3.8, 2, 1, 0.5, 0.25, 1, 2, 3, 4
];
var monthLetters = "JFMAMJJASOND";
var numDrops = 500;
var maxDrops = 600;
var minDrops = 600;
var horizon;
var ripplecolor = 130;
var dropcolor = 170;
var rainspeed = 2;
var ripplegrowth = 7;
var drops;


function preload() {
  plainFont = loadFont("data/Roboto-Light.ttf");
  boldFont = loadFont("data/Roboto-Bold.ttf");
}


function setup() {
  createCanvas(375, 667);
    dark =color(0);
  light = color(183, 191, 204);
   horizon = height/3;
  drops = [];
  for(var i = 0; i< maxDrops; i++){
    d = new Drop(int(random(width)),-int(random(height*2)), int(map((horizon+int(random(horizon*2))),height*.35,height,0,height)),1280);
    drops.push(d);
  }
  //frameRate(40);
}


function draw() {

  for (var i = 0; i <= height; i++) {
      var inter = map(i, 0, height, 0, 1);
      var c = lerpColor(light, dark, inter);
      stroke(c);
      line(0, i, width, i);
    }
  
   for(var i = 0; i<drops.length; i++){
   drops[i].fall();
 }
  
  
  noStroke();
  fill(255);
  strokeWeight(.7);
  stroke(255);
  textFont(plainFont, 25);
  textAlign(CENTER);
  text("Monthly Precipitation", width/2, 40);
  textFont(plainFont, 14);
  strokeWeight(.1);
  text("Cambridge, Massachusetts", (chartLeft + chartRight)/2, 65);
  
  noFill();
  stroke(255, 255, 255);


  for (var j = 0; j<3; j++){
     for(var i = 0; i<4; i++){
      strokeWeight(1);
      var y = map(precipitation[j+(i*3)],  legendLow, legendHigh, 40, 100);
       ellipseMode(CENTER);
      ellipse(width/5+110*j, 150 + 120*i, y, y);
       fill(255, 255, 255);
       textAlign(CENTER, CENTER);
       textSize(25);
       text(monthLetters[j+(i*3)], width/5+110*j -1, 150 -3 + 120*i);
       textSize(14);
       noStroke();
       text(precipitation[j+(i*3)] + '"', width/5+110*j, 148 + 120*i+(y/2 + 10));
       noFill();
        stroke(255, 255, 255);
    }
  }
  
  
  fill(0);
  
  // draw the bars
  strokeWeight(barWidth);
  strokeCap(SQUARE);
  textAlign(CENTER);
  translate(0, height/2.5);
  textFont(plainFont, 16);
  for (var month = 0; month < 12; month++) {
    var x = map(month, 0, 11, chartLeft, chartRight);
    var y = map(precipitation[month], legendHigh, legendLow, chartTop, chartBottom);
    stroke(0);
   // line(x, chartBottom, x, y);
    noStroke();
    //text(monthLetters[month], x, 318);    
  }
  // draw the legend
  textAlign(LEFT, CENTER);
  for (var inches = legendLow; inches <= legendHigh; inches += 2) {
    var legendY = map(inches, legendLow, legendHigh, chartBottom, chartTop);
  //  text(inches + '"', 342, legendY);
  }

stroke(0);
  fill(0);
}

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
