import React from "react";
import styles from "./GameBoy.module.css";

const GameBoy = (props) => {

  return (
    <div className={styles.gameBoyWrapper} >
      <div className={styles.gameBoyHead} >
        <div className={styles.gameBoardWrapper} >
          {props.children}
        </div>
        <div className={styles.gameBoyMark} >
          <h4>GameBOY <span>PONG!</span></h4>
        </div>
      </div>
    </div>
  );
};

export default GameBoy;
