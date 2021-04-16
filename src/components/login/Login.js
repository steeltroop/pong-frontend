import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { googleLogin } from "../../api/firebase/googleAuth";
import * as userActions from "../../redux/actions/userActions";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const setUser = (user) => {
    dispatch(userActions.setUser(user));
  };

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
