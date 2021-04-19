import React, { useState, useEffect, useRef } from "react";
import { userPaddleCollision, partnerPaddleCollision } from "./paddleCollision";
import drawPaddle from "./paddle";
import drawBall from "./ball";
import data from "./data";
import styles from "./GameBoard.module.css";

const { ballObj, userPaddleObj, partnerPaddleObj } = data;

const GameBoard = () => {
  const canvasRef = useRef(null);
  const [reset, setReset] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const [isMoveLeft, setIsMoveLeft] = useState(false);
  const [ballPositionX, setBallPositionX] = useState(null);
  const [ballPositionY, setBallPositionY] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [partnerPosition, setPartnerPosition] = useState(null);

  let ballX = 0;
  let ballY = 0;

  const handleClick = () => {
    setReset(true);
  };

  useEffect(() => {
    partnerPaddleObj.x = partnerPosition;

    if (isMove && isMoveLeft) {
      userPaddleObj.x -= 5;
    }

    if (isMove && !isMoveLeft) {
      userPaddleObj.x += 5;
    }
  }, [userPosition, partnerPosition, ballPositionX, ballPositionY, isMove]);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;

      if (!canvas) {
        ballObj.x = ballX;
        ballObj.y = ballY;

        return;
      }

      canvas.focus();
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;

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
      partnerPaddleCollision(ballObj, partnerPaddleObj, canvas);

      if (reset) {
        ballObj.x = canvas.width / 2;
        ballObj.y = canvas.height / 2;
        ballObj.dx = 0;
        ballObj.dy = 5;
        userPaddleObj.x = canvas.width / 2 - userPaddleObj.width / 2;

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
        ballObj.x = canvas.width / 2;
        ballObj.y = canvas.height / 2;

        drawPaddle(ctx, canvas, userPaddleObj, ballObj);
        drawPaddle(ctx, canvas, partnerPaddleObj, ballObj, true);

        return;
      }

      requestAnimationFrame(render);
    };

    render();
  }, [reset]);

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === 37 || keyCode === 65) {
      setIsMove(true);
      setIsMoveLeft(true);
    }

    if (keyCode === 39 || keyCode === 68) {
      setIsMove(true);
      setIsMoveLeft(false);
    }
  };

  const handleKeyUp = () => {
    setIsMove(false);
  };

  return (
    <div className={styles.wrapper}>
      <canvas
        onKeyDown={(event) => handleKeyDown(event)}
        onKeyUp={handleKeyUp}
        id="canvas"
        className={styles.canvas}
        ref={canvasRef}
        height="700px"
        width="500px"
        tabIndex="0"
      />
      <button onClick={handleClick}>RESET</button>
    </div>
  );
};

export default GameBoard;
