import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../redux/actions/userActions";
import drawPaddle from "./paddle";
import drawBall from "./ball";
import data from "./data";
import { NUMBERS } from "../../constants";
import styles from "./GameBoard.module.css";

const { ballObj, userPaddleObj, partnerPaddleObj } = data;

const GameBoard = (props) => {
  const {
    socket,
    userScore,
    partnerScore,
    plusUserScore,
    plusPartnerScore,
    modalCountDown,
    setRecessModal,
    setGameEndModal,
    gameEndRef
  } = props;
  const [isReset, setIsReset] = useState(false);
  const [isRoundEnd, setIsRoundEnd] = useState(false);
  const isModerator = useSelector(state => state.roomMatch.gameBoard.isModerator);
  const dispatch = useDispatch();
  const history = useHistory();
  const canvasRef = useRef(null);
  const resetRef = useRef(false);

  useEffect(() => {
    socket.emit("sendCanvas", ({
      canvasWidth: canvasRef.current.width,
      canvasHeight: canvasRef.current.height
    }));

    socket.on("move", ({ ballData, end, isBallTop }) => {
      ballObj.x = ballData.x;
      ballObj.y = ballData.y;

      if (end) {
        setIsRoundEnd(true);
        socket.emit("endRound");

        if (isModerator && isBallTop) {
          plusUserScore();

          return;
        }

        if (isModerator && !isBallTop) {
          plusPartnerScore();

          return;
        }

        if (!isModerator && isBallTop) {
          plusPartnerScore();

          return;
        }

        if (!isModerator && !isBallTop) {
          plusUserScore();
        }
      };
    });

    socket.on("keyDown", ({ userPaddleX, partnerPaddleX }) => {
      userPaddleObj.x = userPaddleX;
      partnerPaddleObj.x = partnerPaddleX;
    });

    socket.on("redirectHome", () => {
      dispatch(userActions.resetState());

      history.push("/");
    });

    return () => {
      socket.emit("refresh");
      setIsRoundEnd(false);
    };
  }, []);

  useEffect(() => {
    if (userScore === NUMBERS.WIN_SCORE || partnerScore === NUMBERS.WIN_SCORE) {
      gameEndRef.current = true;
      setGameEndModal(true);
    }
  }, [userScore, partnerScore]);

  useEffect(() => {
    if (!isRoundEnd) return;

    if (gameEndRef.current) {
      resetRef.current = true;

      return;
    }

    setRecessModal(true);
    modalCountDown();

    resetRef.current = true;

    setTimeout(() => {
      resetRef.current = false;
      canvasRef.current?.focus();
      setIsReset(prev => !prev);
      setIsRoundEnd(false);
      setRecessModal(false);
    }, NUMBERS.RESET_TIMEOUT);
  }, [isRoundEnd]);

  useEffect(() => {
    canvasRef.current.focus();
    userPaddleObj.x = (canvasRef.current.width / NUMBERS.HALF) - (userPaddleObj.width / NUMBERS.HALF);
    partnerPaddleObj.x = (canvasRef.current.width / NUMBERS.HALF) - (partnerPaddleObj.width / NUMBERS.HALF);

    const render = () => {
      if (resetRef.current) return;

      const canvas = canvasRef.current;

      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      socket.emit("move", isModerator);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBall(ctx, canvas, ballObj, isModerator);

      if (isModerator) {
        drawPaddle(ctx, canvas, userPaddleObj, ballObj, true);
        drawPaddle(ctx, canvas, partnerPaddleObj, ballObj);
      } else {
        drawPaddle(ctx, canvas, userPaddleObj, ballObj);
        drawPaddle(ctx, canvas, partnerPaddleObj, ballObj, true);
      }

      requestAnimationFrame(render);
    };

    render();
  }, [isReset, isModerator]);

  const handleKeyDown = ({ keyCode }) => {
    if (gameEndRef.current || isRoundEnd) return;

    socket.emit("keyDown", {
      keyCode,
      isModerator
    });
  };

  const handleKeyUp = () => {
    socket.emit("keyUp", isModerator);
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
