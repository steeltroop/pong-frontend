import React from "react";
import googleLogin from "../../api/firebase/googleLogin";
import { useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
  const history = useHistory();

  const handleClick = () => {
    googleLogin(goHomePage, setUser);
  };

  const goHomePage = () => {
    history.push("/");
  };

  return (
    <div>
      <div className="title">
        <h1>Pong</h1>
      </div>
      <button
        onClick={handleClick}
      >
        Google Login
      </button>
    </div>
  );
};

export default Login;
