import React, { useState, useEffect, useRef } from "react";
import { drawBall } from "./drawBall";
import paddleCollision from "./paddleCollision";
import Paddle from "./paddle";
import data from "./data";
import "./gameboard.css";

const { ballObj, paddleProps } = data;

const GameBoard = () => {
  const canvasRef = useRef(null);
  const [reset, setReset] = useState(false);

  const handleClick = () => {
    setReset(true);
  };

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (reset) {
        ballObj.x = canvas.width / 2;
        ballObj.y = canvas.height / 2;
        setReset(false);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall(ctx, ballObj, canvas);

      if (ballObj.y - ballObj.radius < 0 || ballObj.y + ballObj.radius > canvas.height) {
        ballObj.dy *= -1;
      }

      if (ballObj.x - ballObj.radius < 0 || ballObj.x + ballObj.radius > canvas.width) {
        ballObj.dx *= -1;
      }

      if (ballObj.y - ballObj.radius < 0 || ballObj.y > canvas.height - ballObj.radius) {
        Paddle(ctx, canvas, paddleProps);
        return;
      }

      Paddle(ctx, canvas, paddleProps);
      paddleCollision(ballObj, paddleProps);

      requestAnimationFrame(render);
    };

    render();
  }, [reset]);

  return (
    <>
      <canvas onMouseMove={(event) => (paddleProps.x = event.clientX - paddleProps.width / 2)} id="canvas" ref={canvasRef} height="700px" width="500px" />
      <button onClick={handleClick}>RESET</button>
    </>
  );
};

export default GameBoard;
