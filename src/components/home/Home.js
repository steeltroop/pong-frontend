import React from "react";
import { subscribeSocket } from "../../config/socket";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./Home.module.css";

const Home = ({ socket }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { name, email } = useSelector(state => state.user);

  const handleClick = () => {
    if (email) {
      subscribeSocket(dispatch);
      socket.emit("initialConnection", name);
      history.push("/battle");

      return;
    }

    history.push("/auth/login");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentsWrapper}>
        <div className={styles.title}>
          <span>PONG!</span>
        </div>
        <div className={styles.content}>
          <button
            onClick={handleClick}
            className={styles.startButton}
          >
            START
          </button>
          <div className={styles.pressText}>
            press start to play
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
