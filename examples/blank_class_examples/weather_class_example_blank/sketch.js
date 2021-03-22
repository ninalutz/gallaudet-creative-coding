//TODO: Replace these with the location you want using Google maps
var lat = 38.90833;
var lon = -76.99208;

//location for our weather ellipse
var locY;
var locX;
var direction = 1;

function setup() {
  createCanvas(375, 667);
  //First the weather is loaded through the API from a GET request 
  w = requestWeather(lat, lon, '60dc5573268814d54e2f5354832b75a6');

  textSize(16);
  textAlign(CENTER);

  locX = width/2;
  locY = height/2;
}

function draw(){
	background(100, 200, 255, 20);
	stroke(255);
	if(w.ready){
		//draw things
		drawWeather();
	}
	else{
		text("Loading...", width/2, height/2);
	}
}

function drawWeather(){
	//variable for temperature
	var temp = w.getTemperature();

	ellipse(locX, locY, temp*2, temp*2);

	var windspeed = w.getWindSpeed();

	locY += windspeed*direction;

	text(temp, locX, locY + 4);

	if(locY >= height - temp || locY <= temp){
		direction = -1*direction;
	}
}

