import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./GameEndModal.module.css";
import { updateWinnerScore } from "../../api/gameApi";
import { NUMBERS } from "../../constants";

const GameEndModal = ({ userScore, socket }) => {
  const isModerator = useSelector(state => state.roomMatch.gameBoard.isModerator);
  const partnerSocketId = useSelector(state => state.roomMatch.partner.socketId);
  const userSocketId = useSelector(state => state.user.socketId);
  const email = useSelector(state => state.user.email);
  const isModeratorWinner = isModerator && userScore === NUMBERS.WIN_SCORE;
  const isPartnerWinner = !isModerator && userScore === NUMBERS.WIN_SCORE;

  let moderatorStatus = null;
  let partnerStatus = null;

  useEffect(() => {
    if (isModeratorWinner || isPartnerWinner) {
      updateWinnerScore(email);
    }
  }, []);

  const handleHomeButtonClick = () => {
    socket.emit("destroyPeer", { userSocketId, partnerSocketId });
    socket.removeAllListeners("sendTextMessage");
    socket.emit("leaveRoom", { userSocketId, partnerSocketId });
  };

  if (isModeratorWinner) {
    moderatorStatus = (
      <div>
        WINNER
      </div>
    );
  } else {
    moderatorStatus = (
      <div>
        LOSER
      </div>
    );
  }

  if (isPartnerWinner) {
    partnerStatus = (
      <div>
        WINNER
      </div>
    );
  } else {
    partnerStatus = (
      <div>
        LOSER
      </div>
    );
  }

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.statusWrapper}>
        {isModerator && moderatorStatus}
        {!isModerator && partnerStatus}
      </div>
      <div className={styles.buttonWrapper}>
        <p onClick={handleHomeButtonClick}>HOME</p>
      </div>
    </div>
  );
};

export default GameEndModal;
