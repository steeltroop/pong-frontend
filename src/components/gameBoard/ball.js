const ball = (ctx, ballObj, sender) => {
  class Ball {
    constructor(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = "#ffd166";
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "black";
      ctx.strokeWidth = 4;
      ctx.fill();
      ctx.stroke();
    }
  }

  const ball = new Ball(ballObj.x, ballObj.y, ballObj.radius);

  ball.draw();

  if (sender) {
    ballObj.x += ballObj.dx;
    ballObj.y += ballObj.dy;
  }
};

export default ball;
