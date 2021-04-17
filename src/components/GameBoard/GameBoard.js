import React, { useState, useEffect, useRef } from "react";
import { userPaddleCollision, partnerPaddleCollision } from "./paddleCollision";
import drawBall from "./ball";
import drawPaddle from "./paddle";
import data from "./data";
import "./gameboard.css";

const { ballObj, userPaddleObj, partnerPaddleObj } = data;

const GameBoard = () => {
  const canvasRef = useRef(null);
  const [reset, setReset] = useState(false);
  const [ballPositionX, setBallPositionX] = useState();
  const [ballPositionY, setBallPositionY] = useState();
  const [userPosition, setUserPosition] = useState(null);
  const [partnerPosition, setPartnerPosition] = useState(100);

  let ballX = 0;
  let ballY = 0;

  const handleClick = () => {
    setReset(true);
  };

  useEffect(() => {
    partnerPaddleObj.x = partnerPosition;
  }, [userPosition, partnerPosition, ballPositionX, ballPositionY]);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;

      if (!canvas) {
        ballObj.x = ballX;
        ballObj.y = ballY;

        return;
      } else {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
      }

      const ctx = canvas.getContext("2d");

      userPaddleObj.y = canvas.height - 30;
      partnerPaddleObj.y = 30;

      setUserPosition(userPaddleObj.x);
      setPartnerPosition(partnerPaddleObj.x);
      setBallPositionX(ballObj.x);
      setBallPositionY(ballObj.y);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBall(ctx, ballObj, canvas);
      drawPaddle(ctx, canvas, userPaddleObj, ballObj);
      drawPaddle(ctx, canvas, partnerPaddleObj, ballObj, true);

      userPaddleCollision(ballObj, userPaddleObj);
      partnerPaddleCollision(ballObj, partnerPaddleObj);

      if (reset) {
        ballObj.x = canvas.width / 2;
        ballObj.y = canvas.height / 2;
        setReset(false);

        return;
      }

      if (ballObj.y - ballObj.radius < 0 || ballObj.y + ballObj.radius > canvas.height) {
        ballObj.dy *= -1;
      }

      if (ballObj.x - ballObj.radius < 0 || ballObj.x + ballObj.radius > canvas.width) {
        ballObj.dx *= -1;
      }

      if (ballObj.y - ballObj.radius < 0 || ballObj.y > canvas.height - ballObj.radius) {
        drawPaddle(ctx, canvas, userPaddleObj, ballObj);
        drawPaddle(ctx, canvas, partnerPaddleObj, ballObj, true);

        return;
      }

      requestAnimationFrame(render);
    };

    render();
  }, [reset]);

  return (
    <>
      <canvas
        onMouseMove={(event) => (userPaddleObj.x = event.clientX - userPaddleObj.width / 2)}
        id="canvas"
        ref={canvasRef}
        height="700px"
        width="500px"
      />
      <button onClick={handleClick}>RESET</button>
    </>
  );
};

export default GameBoard;
