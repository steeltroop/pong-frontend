export const userPaddleCollision = (ballObj, paddleObj) => {
  if (
    ballObj.x < paddleObj.x + paddleObj.width &&
    ballObj.x > paddleObj.x &&
    paddleObj.y < paddleObj.y + paddleObj.height &&
    ballObj.y + ballObj.radius > paddleObj.y - paddleObj.height / 2
  ) {
    let collidePoint = ballObj.x - (paddleObj.x + paddleObj.width / 2);

    collidePoint = collidePoint / (paddleObj.width / 2);

    const angle = (collidePoint * Math.PI) / 3;

    ballObj.dx = ballObj.speed * Math.sin(angle);
    ballObj.dy = ballObj.speed * Math.cos(angle) * -1;
  }
};

export const partnerPaddleCollision = (ballObj, paddleObj) => {
  if (
    ballObj.x < paddleObj.x + paddleObj.width &&
    ballObj.x > paddleObj.x &&
    paddleObj.y < paddleObj.y + paddleObj.height &&
    ballObj.y + ballObj.radius < paddleObj.y - paddleObj.height / 2
    ) {
    let collidePoint = ballObj.x - (paddleObj.x + paddleObj.width / 2);

    collidePoint = collidePoint / (paddleObj.width / 2);

    const angle = (collidePoint * Math.PI) / 3;

    ballObj.dx = ballObj.speed * Math.sin(angle);
    ballObj.dy = ballObj.speed * Math.cos(angle) * -1;
  }
};
