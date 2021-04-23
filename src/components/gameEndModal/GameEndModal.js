import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./GameEndModal.module.css";
import { updateWinnerScore } from "../../api/gameApi";

const GameEndModal = ({ userScore, socket }) => {
  const isModerator = useSelector(state => state.roomMatch.gameBoard.isModerator);
  const partnerSocketId = useSelector(state => state.roomMatch.partner.socketId);
  const userSocketId = useSelector(state => state.user.socketId);
  const email = useSelector(state => state.user.email);
  const isModeratorWinner = isModerator && userScore === 3;
  const isPartnerWinner = !isModerator && userScore === 3;

  let moderatorStatus = null;
  let partnerStatus = null;

  useEffect(() => {
    if (isModeratorWinner || isPartnerWinner) {
      updateWinnerScore(email);
    }
  }, []);

  const handleHomeButtonClick = () => {
    socket.removeAllListeners("sendTextMessage");
    socket.emit("leaveRoom", { userSocketId, partnerSocketId });
  };

  if (isModeratorWinner) {
    moderatorStatus = (
      <>
        <div>
          WINNER 🤩
        </div>
        <div>
          잘 하고 있어요 ! 킵 고잉 !
        </div>
      </>
    );
  } else {
    moderatorStatus = (
      <>
        <div>
          LOSER 😭
        </div>
        <div>
          조금만 더 분발해주세요 !
        </div>
      </>
    );
  }

  if (isPartnerWinner) {
    partnerStatus = (
      <>
        <div>
          WINNER 🤩
        </div>
        <div>
          잘 하고 있어요 ! 킵 고잉 !
        </div>
      </>
    );
  } else {
    partnerStatus = (
      <>
        <div>
          LOSER 😭
        </div>
        <div>
          조금만 더 분발해주세요 !
        </div>
      </>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.statusWrapper}>
        {isModerator && moderatorStatus}
        {!isModerator && partnerStatus}
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.buttons}>
          <button onClick={handleHomeButtonClick}>Home</button>
        </div>
      </div>
    </div>
  );
};

export default GameEndModal;
