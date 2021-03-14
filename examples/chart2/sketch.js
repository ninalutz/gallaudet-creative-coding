var plainFont;
var boldFont

var chartLeft = 100;
var chartRight = 590;

var barWidth = 30; 

var chartTop = 50;
var chartBottom = 375-50;

var daycolor;

var monthLetters = "JFMAMJJASOND";

var data;
var nightcolor;


function preload() {
  plainFont = loadFont("data/Roboto-Light.ttf");
  boldFont = loadFont("data/Roboto-Bold.ttf");
  data = loadTable("data/sunrise-sunset.csv", "header");
}


function setup() {
  createCanvas(375, 667);
  noLoop();
  daycolor = color(250, 240, 80);
  nightcolor = color(14, 37, 120);
}


function draw() {
  background(30);
  
  fill(255);

  
  textFont(plainFont, 20);
  textAlign(CENTER);
  text("Daylight and Temperature by Hour", width/2, 50);
  
    textFont(boldFont, 14);
  // draw the bars
  strokeWeight(barWidth);
  strokeCap(SQUARE);
  for (var month = 0; month < 12; month++) {
    var x = map(month, 0, 11, chartLeft, chartRight);
    var sunriseY = map(getSunrise(month), 0, 24*60, chartBottom, chartTop);
    var sunsetY = map(getSunset(month), 0, 24*60, chartBottom, chartTop);
    

    // first draw a black bar top to bottom
    stroke(nightcolor);
    //line(chartTop, x, chartBottom, x);
    
    // now draw a gray bar for the daylight hours
    stroke(daycolor);
    //line(sunriseY, x, sunsetY, x);
    
    // down below, show the first letter of the month
    noStroke();
    fill(255);
    text(monthLetters[month], 30, x+barWidth/2 -2);  
    translate(10, 0);
    for(var hr = 0; hr<24; hr++){
            stroke(255, 0, 0);

      strokeWeight(9);
      
      if(11.7*hr + 53 <= sunriseY){
      	stroke(daycolor);
      }
      
      if(11.7*hr + 53 <= sunsetY){
      	stroke(nightcolor);
      }
      
      if(11.7*hr + 53 > sunriseY){
      	stroke(nightcolor);
      }
		
      
    	line(11.7*hr + 53, x+barWidth/2, 11.7*hr + 53, x-random(0, barWidth/2));
    }
    translate(-10, 0);
    strokeWeight(barWidth);
    
  }

  
}


function getSunrise(month) {
  var when = data.get(month, "sunrise");
  // break "6:12" into two pieces, '6' and '12'
  var parts = when.split(':');
  var hour = Number(parts[0]);
  var minute = Number(parts[1]);
  return hour*60 + minute;
}


function getSunset(month) {
  var when = data.get(month, "sunset");
  var parts = when.split(':');
  // all these numbers are PM, so add 12
  var hour = Number(parts[0]) + 12;
  var minute = Number(parts[1]);
  return hour*60 + minute;
}