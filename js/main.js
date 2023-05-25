window.addEventListener("onload", () => {
  document.querySelectorAll("video").forEach((ele) => ele.play());
});

function animate() {
  // Run The Animation Frame
  requestAnimationFrame(animate);
  // Clear canvas every frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the Circles Every Frame
  for (let i = 0; i < drawsArray.length; i++) {
    drawsArray[i].draw();
  }
}

let canvas = document.getElementById("canvas-1");

function canvasWidth(canvas) {
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight;
}
canvasWidth(canvas);

// Resize Any Canvas to The Screen
window.addEventListener("resize", () => {
  canvasWidth(canvas);
});

let fullCircle = Math.PI * 2;
let ctx = canvas.getContext("2d");
let circlesColor = ["#2c3e50", "#e74c3c", "#ecf0f1", "#3498db", "#2980b9"];

// First Class in The First Canvas
class Circle {
  constructor(x, y, dx, dy, color, raduis) {
    this.raduis = raduis;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  // Draw The Circles
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.arc(this.x, this.y, this.raduis, 0, fullCircle);
    ctx.stroke();
    this.update();
  }

  // Update The Location of the Circles
  update() {
    if (this.x + this.raduis > canvas.width || this.x - this.raduis < 0)
      this.dx = -this.dx;
    this.x += this.dx;

    if (this.y + this.raduis > canvas.height || this.y - this.raduis < 0)
      this.dy = -this.dy;
    this.y += this.dy;
  }
}

let drawsArray = [];
for (let i = 0; i < 100; i++) {
  // put the data of the circles randomly
  let raduis = 50;
  let x = Math.random() * (canvas.width - raduis * 2) + raduis;
  let y = Math.random() * (canvas.height - raduis * 2) + raduis;
  let dx = Math.random() * 1.5 - 0.5;
  let dy = Math.random() * 1.5 - 0.5;

  // push in Array
  drawsArray.push(
    new Circle(
      x,
      y,
      dx,
      dy,
      circlesColor[Math.floor(Math.random() * circlesColor.length)],
      raduis
    )
  );
}

// animate();
