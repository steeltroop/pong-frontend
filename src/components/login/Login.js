import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { googleLogin } from "../../api/firebase/googleAuth";
import * as userActions from "../../redux/actions/userActions";
import { URL } from "../../constants";
import styles from "./Login.module.css";

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
      <div className={styles.innerWrapper}>
        <div className={styles.title}>
          <h1>PONG!</h1>
        </div>
        <div className={styles.loginContainer}>
          <div>
            <div
              className={styles.button}
              onClick={handleClick}
            >
              <div className={styles.iconWrapper}>
                <img
                  className={styles.icon}
                  src={URL.GOOGLE_LOGO}
                />
              </div>
              <p className={styles.text}>
                <b>Sign in with google</b>
              </p>
            </div>
          </div>
          <div className={styles.pressText}>
            please google login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
