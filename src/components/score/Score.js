import React from "react";
import { COLORS } from "../../constants/index"
import styles from "./Score.module.css";

const Score = (props) => {
  const {
    isModerator,
    userScore,
    partnerScore
  } = props;

  return (
    <div className={styles.score}>
      {isModerator &&
        <>
          <div style={{ color: COLORS.USER_PADDLE }}>
            <div className={styles.userNick}>
              PANDA<span className={styles.panda}>🐼</span>
            </div>
            <div>
              {userScore}
            </div>
          </div>
          <div style={{ color: COLORS.PARTNER_PADDLE }}>
            <div className={styles.userNick}>
              BEAR<span className={styles.bear}>🐻</span>
            </div>
            <div>
              {partnerScore}
            </div>
          </div>
        </>}
      {!isModerator &&
        <>
        <div style={{ color: COLORS.USER_PADDLE }}>
          <div className={styles.userNick}>
            Villain
          </div>
          <div>
            {partnerScore}
          </div>
        </div>
        <div style={{ color: COLORS.PARTNER_PADDLE }}>
          <div className={styles.userNick}>
            Hero
          </div>
          <div>
            {userScore}
          </div>
        </div>
      </>}
    </div>
  );
};

export default React.memo(Score);
