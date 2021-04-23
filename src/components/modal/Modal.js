import React from "react";
import styles from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.countWrapper}>
        <div className={styles.arc}>
          <div className={styles.arc2}>
          </div>
        </div>
      </div>
      <div className={styles.countDownWrapper}>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
