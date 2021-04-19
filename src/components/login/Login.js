import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { googleLogin } from "../../api/firebase/googleAuth";
import * as userActions from "../../redux/actions/userActions";
import styles from "./Login.module.css";
import { URL } from "../../constants/index";

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
    <div className={styles.wrapper}>
      <div className={styles.buttonTitleWrapper}>
        <div className={styles.title}>
          <h1>PONG!</h1>
        </div>
        <div className={styles.buttonWrapper}>
          <div
            className={styles.button}
            onClick={handleClick}
          >
            <div class={styles.iconWrapper}>
              <img
                class={styles.icon}
                src={URL.GOOGLE_LOGO}
              />
            </div>
            <p class={styles.text}>
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
