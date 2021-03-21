function preload(){
  plainFont = loadFont("data/GeosansLight.ttf");
}

var highcolor;
var lowcolor;
var mainblack;
var subblack;

function setup() {
  createCanvas(375, 667);
  w = requestWeather(42.3596764, -71.0958358, '60dc5573268814d54e2f5354832b75a6');
  highcolor = color(227, 37, 43);
  lowcolor = color(42, 80, 216);
  mainblack = color(0, 0, 30);
  subblack = color(40);
  plum = color(10, 0, 100);
}

var secondoffset = 5;
var numdays = 5;

function draw() {
  background(255);
    if (w.ready) {
    drawWeather();
     noLoop();
  } else {
    text("Loading...", width/2, height/2);
  }
}

function drawWeather(){
  background(250, 250, 248);
  textAlign(CENTER, CENTER);
  noStroke();
  fill(subblack);
  textFont(plainFont, 20);
  text("Cambridge, MA, USA", width/2, 40);
  fill(mainblack);
  textFont(plainFont, 35);
  text(w.getTime().hourMinuteLong(), width/2, 80 + secondoffset);
  textFont(plainFont, 50);
  text(w.getSummary(), width/2, 132+secondoffset);
  textFont(plainFont, 75);
  fill(plum);
  text(formatDegrees(w.getTemperature()), width/2, 195 + secondoffset);
  var temps = w.getTemperature('hourly');
  textFont(plainFont, 30);
  textAlign(CENTER, TOP);
  fill(lowcolor);
  text(formatDegrees(min(temps)), width/2 - 70, 187+ secondoffset );
  fill(highcolor);
  text(formatDegrees(max(temps)), width/2 + 70, 187 + secondoffset);
  strokeWeight = 0;
  fill(mainblack);
  textFont(plainFont, 25);
  textAlign(CENTER, CENTER);
    var thirdy = 350;
  text("Feels like " + formatDegrees(w.getApparentTemperature()) +" with " + int(w.getWindSpeed()) + " mph" + " winds.", width/2, thirdy -40);
  textFont(plainFont, 22);
  text(formatPercent(w.getPrecipProbability()), map(1, 1, 3, 50, width-50), thirdy);
  text("5:15pm", map(2, 1, 3, 50, width-50), thirdy);
  text(formatPercent(w.getHumidity()), map(3, 1, 3, 50, width-50), thirdy);
  textFont(plainFont, 18);
  text("Rain", map(1, 1, 3, 50, width-50), thirdy + 25);
  text("Sunset", map(2, 1, 3, 50, width-50), thirdy + 25);
  text("Humidity", map(3, 1, 3, 50, width-50), thirdy + 25);

  var weekmintemps = w.getTemperatureMin('daily');
    var weekmaxtemps = w.getTemperatureMax('daily');
  fourthy = thirdy + 90;
  textFont(plainFont, 40);
  text("5 Day Forecast", width/2, fourthy + 20);

  for(var i = 0; i<numdays; i++){
    textAlign(CENTER, CENTER);

    var x = map(i, 0,numdays,50,width+10);
      strokeWeight = 1;
      stroke(plum);
      y = fourthy + 110;
      textFont(plainFont, 35);
      fill(plum);

      noStroke();
      textFont(plainFont, 35);
      fill(plum);
      text(formatDegrees((weekmintemps[i] + weekmaxtemps[i])/2), x, y);

      textFont(plainFont, 20);
      fill(mainblack);
      fill(highcolor);
      text(formatDegrees(weekmaxtemps[i]), x, y-30);
      fill(lowcolor);
      text(formatDegrees(weekmintemps[i]), x, y+30);
      fill(mainblack);
      noStroke();
  }

}