import React from "react";
import { useHistory } from "react-router-dom";

const Home = ({ user }) => {
  const history = useHistory();

  const handleClick = () => {
    if (user.email) {
      history.push("/battle");

      return;
    }

    history.push("/");
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
