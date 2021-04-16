export function drawBall(ctx, ballObj, canvas) {
  const data = new Ball(ballObj.x, ballObj.y, ballObj.radius);
  data.draw(ctx);
  ballObj.x += ballObj.dx;
  ballObj.y += ballObj.dy;
}

class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.strokeWidth = 4;
    ctx.fill();
    ctx.stroke();
  }
}
