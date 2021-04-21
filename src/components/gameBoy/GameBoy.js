import React from "react";
import styles from "./GameBoy.module.css";

const GameBoy = (props) => {

  return (
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
          {props.children}
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
  );
};

export default GameBoy;
