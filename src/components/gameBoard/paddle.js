const paddle = (ctx, canvas, paddleObj, ballObj, partner) => {
  class Paddle {
    constructor(x) {
      this.x = x;
      this.y = partner ? ballObj.radius : canvas.height - ballObj.radius - paddleObj.height;
      this.height = paddleObj.height;
      this.width = paddleObj.width;
      this.color = paddleObj.color;
    }

    draw() {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.color;
      ctx.lineWidth = 1;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.fill();
    }
  }

  const paddle = new Paddle(paddleObj.x);

  paddle.draw();

  if (paddleObj.x <= 0) {
    paddleObj.x = 0;
  } else if (paddleObj.x + paddleObj.width >= canvas.width) {
    paddleObj.x = canvas.width - paddleObj.width;
  }
};

export default paddle;
