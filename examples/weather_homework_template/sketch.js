
//TODO: Replace these with the location you want using Google maps

var lat = 42.3596764;
var lon = -71.0958358;
function setup() {
  createCanvas(375, 667);
  w = requestWeather(lat, lon, '60dc5573268814d54e2f5354832b75a6');
}


function draw() {
  background(255);
    if (w.ready) {
    drawWeather();
     noLoop();
  } else {
    text("Loading...", width/2, height/2);
  }
}

//This is where you put your weather drawing
function drawWeather(){

}