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
  constructor(x, y, dx, dy, color, raduis, friction) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.raduis = raduis;
    this.friction = friction;
  }

  // Draw The Circles
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.raduis, 0, fullCircle);
    ctx.fill();
    this.update();
  }

  // Update The Location of the Circles
  update() {
    if (this.y + this.raduis < canvas.height) {
      this.dy++;
    } else {
      this.dy = -this.dy * this.friction;
    }
    this.y += this.dy;
  }
}

let drawsArray = [];
for (let i = 0; i < 100; i++) {
  // put the data of the circles randomly
  let raduis = 30;
  let x = Math.random() * canvas.width;
  let y = Math.random() * 200;
  let dx = Math.random() * 2 - 0.5;
  let dy = 1;
  let friction = Math.random() * 0.17 + 0.8;

  // push in Array
  drawsArray.push(
    new MouseMoveCircle(
      x,
      y,
      dx,
      dy,
      circlesColor[Math.floor(Math.random() * circlesColor.length)],
      raduis,
      friction
    )
  );
}

function animateFrame() {
  requestAnimationFrame(animateFrame);
  repaint(canvas, ctx, drawsArray);
}
animateFrame();
