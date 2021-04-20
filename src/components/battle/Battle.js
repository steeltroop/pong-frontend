import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ScoreBoard from "../scoreBoard/ScoreBoard";
import GameBoard from "../gameBoard/GameBoard";
import ChatRoom from "../chatRoom/ChatRoom";
import Webcam from "../webcam/Webcam";
import Modal from "../modal/Modal";
import styles from "./Battle.module.css";
import { NUMBERS } from "../../constants/index";

const Battle = ({ socket }) => {
  const isPartnerDisconnected = useSelector(state => state.modal.isPartnerDisconnected);
  const [count, setCount] = useState(3);
  const [isPlaying, setPlaying] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [partnerScore, setPartnerScore] = useState(0);
  const { isMatched } = useSelector(state => state.roomMatch);
  const timerRef = useRef();

  useEffect(() => {
    if (count === NUMBERS.END_COUNT) {
      clearInterval(timerRef.current);
      setPlaying(true);
    }

    if (isMatched && count === NUMBERS.INITIAL_COUNT) {
      timerRef.current = setInterval(() => {
        setCount((prev) => prev - NUMBERS.SUBTRACT_NUMBER);
      }, NUMBERS.DELAY);
    }
  }, [isMatched, count]);

  return (
    <div className={styles.wrapper}>
      {isPartnerDisconnected && <Modal />}
      <div className={styles.webcamWrapper}>
        <ScoreBoard
          count={count}
          isPlaying={isPlaying}
          userScore={userScore}
          partnerScore={partnerScore}
        />
        <Webcam socket={socket} />
      </div>
      <div className={styles.gameBoyWrapper}>
        <div className={styles.gameBoyHead}>
          <div className={styles.power}>
            <p>
              <span className={styles.ledButton}>⬤</span>
              <span> ) ) )</span>
            </p>
            <p>POWER</p>
          </div>
          <div className={styles.gameBoardWrapper}>
            {isMatched && count === NUMBERS.END_COUNT
              ? <GameBoard
                  socket={socket}
                  handleUserScore={setUserScore}
                  handlePartnerScore={setPartnerScore}
                />
              : <div style={{color: "black"}}>Finding user...</div>}
          </div>
          <div className={styles.gameBoyMark}>
            <h4>Game BOY <span>COLOR</span></h4>
          </div>
        </div>
        <div className={styles.gameBoyBody}>
          <div className={styles.pad}>
            <div className={styles.upDownWrapper}>
              <div className={styles.upButton}>▲</div>
              <div className={styles.downButton}>▼</div>
            </div>
            <div className={styles.leftRightWrapper}>
              <div className={styles.leftButton}>◀︎</div>
              <div className={styles.rightButton}>▶︎</div>
            </div>
          </div>
          <div className={styles.selectStartWrapper}>
            <div className={styles.selectWrapper}>
              <div className={styles.selectButton}></div>
              <div className={styles.selectText}>SELECT</div>
            </div>
            <div className={styles.startWrapper}>
              <div className={styles.startButton}></div>
              <div className={styles.startText}>START</div>
            </div>
          </div>
          <div className={styles.buttonsWrapper}>
            <div className={styles.buttonA}>
              <h2>A</h2>
            </div>
            <div className={styles.buttonB}>
              <h2>B</h2>
            </div>
          </div>
        </div>
      </div>
      <ChatRoom socket={socket} />
    </div>
  );
};



export default Battle;
