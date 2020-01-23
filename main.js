const particles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  // Make sure we don't have too few or too many particles on screen
  const particlesLength = Math.floor(window.innerWidth / 10);

  // create particles based on the amount in the array
  // the wider the screen the more in the array
  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  /*
    // Drawing stuff with circles anf mouse
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(100);
  }

  circle(mouseX, mouseY, 80);
  */
  // use same colors as in style.css so animation trail hidden or we'd just get lines
  background(55, 100, 144);
  particles.forEach((p, index) => {
    p.update();
    p.draw();
    p.checkParticles(particles.slice(index));
  });
}

class Particle {
  constructor() {
    // Position
    this.pos = createVector(random(width), random(height));
    // Velocity
    this.vel = createVector(random(-5, 5), random(-2, 2));
    // Size
    this.size = 10;
  }

  // Update movement by adding velocity
  update() {
    this.pos.add(this.vel);
    this.edges();
  }

  // Draw single particle
  draw() {
    noStroke();
    fill("rgba(255,255,255,0.5)");
    circle(this.pos.x, this.pos.y, this.size);
  }

  // Detect edges to bounce off
  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }

    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  // Connect particles with lines
  checkParticles(particles) {
    particles.forEach(particle => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      if (d < 120) {
        stroke("rgba(255,255,255,0.1");
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}
