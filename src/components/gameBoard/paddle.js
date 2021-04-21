const paddle = (ctx, canvas, paddleObj, ballObj, user) => {
  class Paddle {
    constructor(x) {
      this.x = user
        ? x
        : canvas.width - paddleObj.width - x;
      this.y = user
        ? canvas.height - ballObj.radius - paddleObj.height
        : ballObj.radius;
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
