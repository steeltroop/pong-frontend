import React from "react";
import { subscribeSocket } from "../../config/socket";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./Home.module.css";
import Modal from "../modalPortal/ModalPortal";

const Home = ({ socket }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { name, email } = useSelector(state => state.user);

  const handleClick = () => {
    subscribeSocket(dispatch);
    socket.emit("initialConnection", name);
    history.push("/battle");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentsWrapper}>
        <div className={styles.title}>
          <span>PONG</span>
          <Modal>
            <div>I am test</div>
          </Modal>
        </div>
        <div className={styles.content}>
          <span>
            How to play? <br />
            <br />
            Press ➡️ to move left <br />
            Press ⬅️ to move right <br />
            <br />
            Player who gets 3 points <br />
            <br />
            wins the game <br />
            <br />
            good luck!
          </span>
        </div>
        <div className={styles.pressText}>
          press start to play
        </div>
        <div>
          <button
            onClick={handleClick}
            className={styles.startButton}
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
};

// if (email) {
//   subscribeSocket(dispatch);
//   socket.emit("initialConnection", name);
//   history.push("/battle");

//   return;
// }

// history.push("/auth/login");

export default Home;
