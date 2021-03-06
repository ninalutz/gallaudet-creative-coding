
//TODO: Replace these with the location you want using Google maps

var lat = 47.60646;
var lon = -70;
var API_Key = '60dc5573268814d54e2f5354832b75a6';
//location for our weather sphere
var locY;
var locX;
var direction = 1;

function setup() {
  createCanvas(375, 667);
  //First the weather is loaded through the API from a GET request 
  w = requestWeather(lat, lon, API_Key);

  textSize(16);
  textAlign(CENTER);

  locX = width/2;
  locY = height/2;
}


function draw() {
  background(100, 200, 255, 20);
  stroke(255);
    if (w.ready) {
    drawWeather();
  } else {
    text("Loading...", width/2, height/2);
  }
}


//This is where you put your weather drawing
function drawWeather(){
  //We can then make a get statement on our weather class from the API 
	var temp = w.getTemperature();

  var col1 = color(255);
  var col2 = color(0);
  var cloud_cover = w.getCloudCover();
  var c = lerpColor(col1, col2, cloud_cover);
  fill(c);

  //We can make an ellipse with the temperature size 
	ellipse(locX, locY, temp*2, temp*2);

  fill(255, 0, 0);
	text(w.getCloudCover(), locX, locY + 4);

  
  //We can make the windspeed the velocity of the circle 
  var windspeed = w.getWindSpeed();
  locY += windspeed*direction;
  if (locY >= height - temp || locY <= temp){
    direction = -1*direction;
  }
}