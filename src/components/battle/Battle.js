import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ScoreBoard from "../scoreBoard/ScoreBoard";
import GameBoy from "../gameBoy/GameBoy";
import GameBoard from "../gameBoard/GameBoard";
import ChatRoom from "../chatRoom/ChatRoom";
import Webcam from "../webcam/Webcam";
import ModalPortal from "../modalPortal/ModalPortal";
import Modal from "../modal/Modal";
import GameEndModal from "../gameEndModal/GameEndModal";
import { NUMBERS } from "../../constants/index";
import styles from "./Battle.module.css";

const Battle = ({ socket }) => {
  const [count, setCount] = useState(3);
  const [modalCount, setModalCount] = useState(3);
  const [isPlaying, setPlaying] = useState(false);
  const [showRecessModal, setRecessModal] = useState(false);
  const [showGameEndModal, setGameEndModal] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [partnerScore, setPartnerScore] = useState(0);
  const isPartnerDisconnected = useSelector(state => state.modal.isPartnerDisconnected);
  const { isMatched } = useSelector(state => state.roomMatch);
  const timerRef = useRef();
  const modalTimerRef = useRef();
  const gameEndRef = useRef();

  let modal = null;

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

  const modalCountDown = () => {
    modalTimerRef.current = setInterval(() => {
      setModalCount(prev => {
        if (!prev) {
          setModalCount(5);
          clearInterval(modalTimerRef.current);
          return;
        }

        return prev - 1;
      });
    }, 1000);
  };

  if (showRecessModal && !showGameEndModal) {
    modal = (
      <ModalPortal>
        <Modal>
          <div>
            GET READY!
          </div>
          <div>
            COUNTDOWN {modalCount}
          </div>
        </Modal>
      </ModalPortal>
    );
  }

  if (showGameEndModal) {
    modal = (
      <ModalPortal>
        <Modal>
          <GameEndModal
            userScore={userScore}
            socket={socket}
          />
        </Modal>
      </ModalPortal>
    );
  }

  const plusUserScore = () => {
    if (!gameEndRef.current) {
      setUserScore(prev => prev + 1);
    }
  };

  const plusPartnerScore = () => {
    if (!gameEndRef.current) {
      setPartnerScore(prev => prev + 1);
    }
  };

  return (
    <div className={styles.wrapper}>
      {modal}
      <div className={styles.webcamWrapper}>
        <ScoreBoard
          count={count}
          isPlaying={isPlaying}
          userScore={userScore}
          partnerScore={partnerScore}
        />
        <Webcam socket={socket} />
      </div>
      <GameBoy>
        {isMatched && count === NUMBERS.END_COUNT
          ? <GameBoard
              socket={socket}
              userScore={userScore}
              partnerScore={partnerScore}
              gameEndRef={gameEndRef}
              showGameEndModal={showGameEndModal}
              setGameEndModal={setGameEndModal}
              plusUserScore={plusUserScore}
              setRecessModal={setRecessModal}
              plusPartnerScore={plusPartnerScore}
              modalCountDown={modalCountDown}
            />
          : <div className={styles.notice} >
              <span>Finding user...</span>
            </div>}
      </GameBoy>
      <ChatRoom socket={socket} />
    </div>
  );
};

export default Battle;
