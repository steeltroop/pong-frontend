import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as userActions from "../../redux/actions/userActions";
import { deleteUserCookie } from "../../utils/deleteUserCookie";
import { googleLogout } from "../../api/firebase/googleAuth";
import styles from "./Nav.module.css";

const Nav = ({ socket }) => {
  const user = useSelector(state => state.user);
  const partnerSocketId = useSelector(state => state.roomMatch.partner.socketId);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogoutBtnClick = () => {
    socket.emit("leaveRoom", { userSocketId: user.socketId, partnerSocketId });
    dispatch(userActions.resetState());
    deleteUserCookie();
    googleLogout();

    history.push("/auth/login");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link
          to="/"
          className={styles.headerBtn}
        >
          <span>Home</span>
        </Link>
        {user.email &&
          <button
            className={styles.headerBtn}
            onClick={handleLogoutBtnClick}
          >
            <span>Logout</span>
          </button>}
        <Link
          to="/ranking"
          className={styles.headerBtn}
        >
          <span>Ranking</span>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
