import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as userActions from "../../redux/actions/userActions";
import { deleteUserCookie } from "../../utils/deleteUserCookie";
import { googleLogout } from "../../api/firebase/googleAuth";
import styles from "./Sidebar.module.css";

const Sidebar = ({ socket }) => {
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
      <Link to="/">
        <span>Home</span>
      </Link>
      {user.email &&
        <button onClick={handleLogoutBtnClick}>
          Logout
        </button>
      }
      <Link to="/ranking">
        <span>Ranking</span>
      </Link>
    </div>
  );
};

export default Sidebar;
