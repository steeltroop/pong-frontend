import React from "react";
import googleLogin from "../api/firebase/googleLogin";
import { useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
  const history = useHistory();

  const handleClick = () => {
    googleLogin(goBattlePage, setUser);
  };

  const goBattlePage = () => {
    history.push("/battle");
  };

  return (
    <div>
      <h1>Pong</h1>
      <button
        onClick={handleClick}
      >
        Google Login
      </button>
    </div>
  );
};

export default Login;
