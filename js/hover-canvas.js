let canvas = document.querySelector("canvas");

import {
  repaint,
  fullCircle,
  circlesColor,
  canvasWidth,
} from "../js/canvas-basics.js";

canvasWidth(canvas);

window.addEventListener("resize", canvasWidth(canvas));

let mouse = {
  x: undefined,
  y: undefined,
};
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

let ctx = canvas.getContext("2d");

// Create The Second Class inheret Properties from the First
class MouseMoveCircle {
  constructor(x, y, dx, dy, color, raduis) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.raduis = raduis;
  }

  // Draw The Circles
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.lineWidth = 2;
    ctx.arc(this.x, this.y, this.raduis, 0, fullCircle);
    ctx.fill();
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

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.raduis < 40) {
        this.raduis += 2;
      }
    } else {
      if (this.raduis > 4) {
        this.raduis -= 2;
      }
    }
  }
}

let drawsArray = [];
for (let i = 0; i < 700; i++) {
  // put the data of the circles randomly
  let raduis = Math.random() * 5 + 1;
  let x = Math.random() * (canvas.width - raduis * 2) + raduis;
  let y = Math.random() * (canvas.height - raduis * 2) + raduis;
  let dx = Math.random() * 1.5 - 0.5;
  let dy = Math.random() * 1.5 - 0.5;

  // push in Array
  drawsArray.push(
    new MouseMoveCircle(
      x,
      y,
      dx,
      dy,
      circlesColor[Math.floor(Math.random() * circlesColor.length)],
      raduis
    )
  );
}

function animateFrame() {
  requestAnimationFrame(animateFrame);

  repaint(canvas, ctx, drawsArray);
}
animateFrame();
