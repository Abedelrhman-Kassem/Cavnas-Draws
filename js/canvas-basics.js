function repaint(canvas, ctx, drawsArray) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < drawsArray.length; i++) {
    drawsArray[i].draw();
  }
}

let fullCircle = Math.PI * 2;
let circlesColor = ["#2c3e50", "#e74c3c", "#ecf0f1", "#3498db", "#2980b9"];

function canvasWidth(canvas) {
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 4;
}

export { repaint, fullCircle, circlesColor, canvasWidth };
