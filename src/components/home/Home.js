import React from "react";
import { subscribeSocket } from "../../config/socket";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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
    <div>
      <div className="title">
        <span>Pong</span>
      </div>
      <div className="content">
        <span>멀티 핑퐁 게임으로 3점을 먼저 내면 승리합니다!</span>
      </div>
      <button onClick={handleClick}>
        START
      </button>
    </div>
  );
};

export default Home;
