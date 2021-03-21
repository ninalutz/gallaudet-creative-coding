/*
It takes a while to load because I draw some PGraphics
Press the numbered keys (1-7) to see all the different states and 8 to return to the present
*/

var m = 0;
var windspeed;
var quantity = 300;
var stars;

var state, current, loaded;
//cloud variables
var t1 = .1;
var t2 = 10000;
var dark = 90;
var light = 255;
var dayclouds, nightclouds, fog;
var snow;
var temperature;
//rain variables
var numDrops = 500;
var maxDrops = 600;
var minDrops = 600;
var horizon;
var ripplecolor = 130;
var dropcolor = 200;
var rainspeed = 2;
var ripplegrowth = 7;
var drops;
var darkrain;
var lightrain;

var temp0, temp1, temp2, temp3;
var state;
var sun, moon;

function setup() {
  loaded = false;
  createCanvas(375, 667);
  temp0 = loadImage("data/notemp.png");
  temp1 = loadImage("data/coldtemp.png");
  temp2 = loadImage("data/medium.png");
  temp3 = loadImage("data/hot.png");
  sun = loadImage("data/sun.png");
  moon = loadImage("data/moon.png");
  snow = [];
  darkrain = color(20);
 lightrain = color(183, 191, 204);

  for(var i = 0; i<quantity; i++){
    snow[i] = new Snow(round(random(1, 7)), 1, 7, round(random(0, .7)), random(0, width), random(0, height));
  }
     horizon = height/3;
    drops = [];
  for(i = 0; i< maxDrops; i++){
    d = new Drop(int(random(width)),-int(random(height*2)), int(map((horizon+int(random(horizon*2))),height*.35,height,0,height)),1280);
    drops.push(d);
  }
  
  stars = createGraphics(width, height);
  dayclouds = createGraphics(width, height);
  nightclouds = createGraphics(width, height);
  fog = createGraphics(width, height);
  for(i = 0; i<500; i++){
    stars.fill(255);
    stars.noStroke();
    stars.ellipse(random(width), random(height), 1, 1);
  }
  w = requestWeather(42.3596764, -71.0958358, '60dc5573268814d54e2f5354832b75a6');
  dayclouds.loadPixels();
    nightclouds.loadPixels();
    fog.loadPixels();
    foggy();
    sunnyandcloudy();
    cloudynight();
    state = 8;
}

function draw() {
  background(255);
  if(!w.ready){
    fill(0);
    text("Loading", width/2, height/2);
  }
  else{
    if(state  == 8){
    weathercalc();
    }
    drawWeather();
  }

}

function drawWeather(){
    if(state == 1){
    clearday();
  }
  if(state == 2){
    clearnight();
  }
  if(state == 3){
    clearday();
    image(dayclouds, 0, 0);
  }
  if(state == 4){
    clearnight();
    image(nightclouds, 0, 0);
  }
  if(state == 5){
    image(fog, 0, 0);
  }
  if(state == 6){
    raining();
  }
  if(state == 7){
    snowing();
  }

   fill(0);
   stroke(0);
   m+=windspeed;
   windmill();
   
   if(temperature == 0){
     image(temp0, 25, 10, 35, 100);
   }
   if(temperature == 1){
     image(temp1,25, 10, 35, 100);
   }
   if(temperature == 2){
     image(temp2, 25, 10, 35, 100);
   }
   if(temperature == 3){
     image(temp3, 25, 10, 35, 100);
   }
   
   if(hour() >= 5 && hour() <= 18){
      image(sun, width-80, 30, 60, 60);
   }
   else{
     image(moon, width-80, 30, 60, 60);
   }
    
}

function clearday(){
   background(76, 198, 255);
}

function raining(){
    background(255);
  for (var i = 0; i <= height; i++) {
      var inter = map(i, 0, height, 0, 1);
      var c = lerpColor(lightrain, darkrain, inter);
      stroke(c);
      line(0, i, width, i);
    }
     for(var i = 0; i<drops.length; i++){
   drops[i].fall();
  } 
  
}

function snowing(){
  noStroke();
  background(82, 96, 119);
  fill(255);
  
  for(var i = 0; i<quantity; i++){
    snow[i].update();
    snow[i].fall();
  }
    fill(255);
}

function clearnight(){
  background(0, 15, 70);
  image(stars, 0, 0);
}

function cloudynight(){
  background(0);
  image(stars, 0, 0);
    var xx=t1;
  var d = pixelDensity();
  for(var i = 0; i<width*d; i++){
     var yy=t2;
    for(var j = 0; j<height*d; j++){
        var bright = color(0,0,map(noise(xx,yy,t2),0,1,dark,light), 140);
        nightclouds.pixels[4*(i + width*d*j)] = red(bright);
        nightclouds.pixels[4*(i + width*d*j) +1 ] = green(bright);
        nightclouds.pixels[4*(i + width*d*j) + 2] = blue(bright);
        nightclouds.pixels[4*(i + width*d*j) +3] = alpha(bright);
        yy += 0.005*d;
    }
    xx += 0.003*d;
    }

  nightclouds.updatePixels();

}

function foggy(){
var xx=t1;
  var d = pixelDensity();

  for(var i = 0; i<width*d; i++){
     var yy=t2;
    for(var j = 0; j<height*d; j++){
        var bright = color(map(noise(xx,yy,t2),0,1,dark,light));
        fog.pixels[4*(i + width*d*j)] = red(bright);
        fog.pixels[4*(i + width*d*j) +1 ] = green(bright);
        fog.pixels[4*(i + width*d*j) + 2] = blue(bright);
        fog.pixels[4*(i + width*d*j) +3] = alpha(bright);
        yy += 0.005*d;
    }
    xx += 0.003*d;
    }

  fog.updatePixels();
  
}

function sunnyandcloudy(){
var xx=t1;
  var d = pixelDensity();
  for(var i = 0; i<width*d; i++){
     var yy=t2;
    for(var j = 0; j<height*d; j++){
        var bright = color(0,0,map(noise(xx,yy,t2),0,1,dark,light), 90);
        dayclouds.pixels[4*(i + width*d*j)] = blue(bright);
        dayclouds.pixels[4*(i + width*d*j) +1 ] = blue(bright);
        dayclouds.pixels[4*(i + width*d*j) + 2] = blue(bright);
        dayclouds.pixels[4*(i + width*d*j) +3] = alpha(bright);
        yy += 0.005*d;
    }
    xx += 0.003*d;
    }
  dayclouds.updatePixels();
  
}


var Snow = function(size, min, max, direction, x, y){
  this.size = size;
  this.x = x;
  this.y = y;
  this.min = min;
  this.max = max;
  this.direction = direction;
  }

Snow.prototype.update = function(){
  fill(255);
  ellipse(this.x, this.y, this.size, this.size);
}

Snow.prototype.fall = function() {
  if(this.direction === 0){
    this.x += map(this.size, this.min, this.max, .1, .5);
  }
    
  else{
    this.x -= map(this.size, this.min, this.max, .1, .5);
  }
  
  this.y += this.size + this.direction;
  
  if(this.x > width + this.size || this.x < -this.size || this.y > height + this.size){
    this.x = random(0, width);
    this.y = -this.size;
  }
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




function windmill(){
  //draw blades
  ellipseMode(CENTER);
  push();
  translate(width/2, height-200);
  rotate(m);
  rotate(radians(200));
  ellipse(0, -48, 15, 100);
  rotate(radians(36));
  ellipse(45, -1.5, 100, 15);
  rotate(radians(-66));
  ellipse(-45, -.5, 100, 15);
  pop();
  
  //draw stand
  rectMode(CENTER);
  rect(width/2, height, 10, 410);
  ellipse(width/2, height-200, 15, 15);

}


function keyPressed(){
  if(key == '1'){
    state = 1;
  }
    if(key == '2'){
    state = 2;
  }
    if(key == '3'){
    state = 3;
  }
    if(key == '4'){
    state = 4;
  }
    if(key == '5'){
    state = 5;
  }
    if(key == '6'){
    state = 6;
  }
    if(key == '7'){
    state = 7;
  }
  if(key == '8'){
    state = 8;
  }
}


function weathercalc(){
  //rain, snow, sleet, wind, fog, cloudy
    windspeed = w.getWindSpeed()/100;
    var outsidetemp = w.getTemperature();
    if(outsidetemp <= 10){
      temperature = 0;
    }
    if(outsidetemp >10 && outsidetemp <= 45){
      temperature = 1;
    }
    if(outsidetemp > 45 && outsidetemp <= 75){
      temperature = 2;
    }
    if(outsidetemp > 75){
      temperature = 3;
    }
    

    state = 1;
  if(w.getIcon() == "clear-day"){
      state = 1;
    }
 if(w.getIcon() == "clear-night"){
      state = 2;
    }
    if(w.getIcon() == "partly-cloudy-night"){
      state = 4;
    }
 if(w.getIcon() == "partly-cloudy-day"){
      state = 3;
    }
  if(w.getIcon() == "rain"){
      state = 6;
    }
  if(w.getIcon() == "cloudy" || w.getIcon() == "foggy"){
    state = 5;
  }
  if(w.getIcon() == "snow" || w.getIcon() == "sleet"){
    state = 7;
  }

    current = state;
}









