import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { userPaddleCollision, partnerPaddleCollision } from "./paddleCollision";
import drawPaddle from "./paddle";
import drawBall from "./ball";
import data from "./data";
import styles from "./GameBoard.module.css";

const { ballObj, userPaddleObj, partnerPaddleObj } = data;

const GameBoard = ({ socket }) => {
  const [reset, setReset] = useState(false);
  const [isRoundEnd, setIsRoundEnd] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const [isMoveLeft, setIsMoveLeft] = useState(false);
  const [ballPositionX, setBallPositionX] = useState(null);
  const [ballPositionY, setBallPositionY] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [partnerPosition, setPartnerPosition] = useState(null);
  const isSender = useSelector(state => state.roomMatch.gameBoard.isSender);
  const partner = useSelector(state => state.roomMatch.partner);
  const canvasRef = useRef(null);

  let ballX = 0;
  let ballY = 0;

  useEffect(() => {
    if (isRoundEnd) {
      setTimeout(() => setIsRoundEnd(false), 2000);
    } else {
      canvasRef.current.focus();
      setReset(true);
    }

    if (isSender) {
      socket.emit("sendRoundEnd", {
        partnerSocketId: partner.socketId,
      });
    }
  }, [isRoundEnd, isSender]);

  useEffect(() => {
    if (isSender) {
      socket.emit("sendBallPosition", {
        positionX: ballPositionX,
        positionY: ballPositionY,
        partnerSocketId: partner.socketId,
      });
    } else {
      socket.on("sendBallPosition", ({ positionX, positionY }) => {
        setBallPositionX(positionX);
        setBallPositionY(positionY);
      });

      socket.on("sendRoundEnd", () => {
        setIsRoundEnd(false);
      });

      ballObj.x = ballPositionX;
      ballObj.y = ballPositionY;
    }

    socket.emit("sendPosition", {
      position: userPosition,
      partnerSocketId: partner.socketId,
    });

    socket.on("sendPosition", ({ position }) => {
      setPartnerPosition(position);
      partnerPaddleObj.x = partnerPosition;
    });

    if (isMove && isMoveLeft) {
      userPaddleObj.x -= 5;
    }

    if (isMove && !isMoveLeft) {
      userPaddleObj.x += 5;
    }
  }, [
    userPosition,
    partnerPosition,
    ballPositionX,
    ballPositionY,
    isMove,
    isMoveLeft,
    isSender,
  ]);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;

      if (!canvas) {
        ballObj.x = ballX;
        ballObj.y = ballY;

        return;
      }

      ballX = canvas.width / 2;
      ballY = canvas.height / 2;

      const ctx = canvas.getContext("2d");

      userPaddleObj.y = canvas.height - 30;
      partnerPaddleObj.x = partnerPaddleObj.x;
      partnerPaddleObj.y = 30;

      setUserPosition(userPaddleObj.x);

      if (isSender) {
        setBallPositionX(ballObj.x);
        setBallPositionY(ballObj.y);
      } else {
        ballObj.x = canvas.width - ballObj.x;
        ballObj.y = canvas.height - ballObj.y;
      }

      userPaddleCollision(ballObj, userPaddleObj);
      partnerPaddleCollision(ballObj, partnerPaddleObj);

      if (reset) {
        ballObj.x = canvas.width / 2;
        ballObj.y = canvas.height / 2;
        ballObj.dx = 0;
        ballObj.dy = 5;
        userPaddleObj.x = canvas.width / 2 - userPaddleObj.width / 2;

        setReset(false);

        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBall(ctx, ballObj, isSender);
      drawPaddle(ctx, canvas, userPaddleObj, ballObj);
      drawPaddle(ctx, canvas, partnerPaddleObj, ballObj, true);

      if (isSender) {
        if (ballObj.x - ballObj.radius < 0 || ballObj.x + ballObj.radius > canvas.width) {
          ballObj.dx *= -1;
        }
      }

      if (ballObj.y - ballObj.radius < 0 || ballObj.y > canvas.height - ballObj.radius) {
        drawPaddle(ctx, canvas, userPaddleObj, ballObj);
        drawPaddle(ctx, canvas, partnerPaddleObj, ballObj, true);

        ballObj.dx = 0;
        ballObj.dy = 5;
        ballObj.x = canvas.width / 2;
        ballObj.y = canvas.height / 2;

        setIsRoundEnd(true);

        return;
      }

      requestAnimationFrame(render);
    };

    render();
  }, [reset, isSender]);

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
    </div>
  );
};

export default GameBoard;
