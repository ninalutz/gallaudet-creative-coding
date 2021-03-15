//Based off the particle system example on p5.js

let system;

function setup() {
  createCanvas(600, 600);
  system = new ParticleSystem(createVector(width/2, height/2));
  colorMode(HSB);
}

function draw() {
  background(0);
  system.addParticle();
  system.addParticle();
  system.run();
  fill(255);
  text("Sketch 1", 10, height - 20);
}

// A simple Particle class
let Particle = function(position) {
  this.acceleration = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
  this.velocity = createVector(random(-5, 5), random(-5, 5));
  this.position = position.copy();
  this.lifespan = 255;
  this.size = random(5, 25);
  this.hue = random(360);
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(360, 0, 360, this.lifespan);
  strokeWeight(0.5);
  fill(this.hue, 100, 100, this.lifespan);
  ellipse(this.position.x, this.position.y, this.size, this.size);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1); //gets rid of dead particles 
    }
  }
};
