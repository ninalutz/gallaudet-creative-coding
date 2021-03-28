
/*
Particle code from Daniel Shiffman's Nature of Code
*/

let movers = [];
function setup() {
  createCanvas(800, 800);
  capture = createCapture(VIDEO);
  capture.size(640,360);
  capture.hide();
  for (var i = 0; i < 1000; i++) {
     movers[i] = new Mover();
  }
}


function draw() {
  background(255, 10);
  image(capture, 100, 100,640,360);
  filter(GRAY);
  for (let i = 0; i < movers.length; i++) {
    movers[i].update();
    movers[i].display();
  }
}


// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Mover{
  constructor() {
    this.position = createVector(random(width),random(height));
    this.velocity = createVector();
    this.acceleration = createVector();
    this.topspeed = 10;
  }

  update() {
    // Compute a vector that points from position to mouse
    var mouse = createVector(mouseX,mouseY);
    this.acceleration = p5.Vector.sub(mouse,this.position);
    // Set magnitude of acceleration
    this.acceleration.setMag(0.01);

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
  }

  display() {
    noStroke();
    fill(255, 30);
    ellipse(this.position.x, this.position.y, 4, 4);
  }
}