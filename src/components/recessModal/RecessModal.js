import React from "react";
import styles from "./RecessModal.module.css";

const RecessModal = ({ count }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.countWrapper}>
        <div>
          {count} 초 뒤에 시작합니다
        </div>
      </div>
    </div>
  );
};

export default RecessModal;
