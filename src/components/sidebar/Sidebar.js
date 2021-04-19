import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import * as userActions from "../../redux/actions/userActions";
import { deleteUserCookie } from "../../utils/deleteUserCookie";
import { googleLogout } from "../../api/firebase/googleAuth";
import styles from "./Sidebar.module.css";

const useStyles = makeStyles({
  on: {
    color: "black",
    opacity: 1,
  },
  off: {
    position: "absolute",
    color: "#FFFFFF",
  },
});

const Sidebar = ({ socket }) => {
  const [isSidebarShow, setSidebarShow] = useState(false);
  const user = useSelector(state => state.user);
  const partnerSocketId = useSelector(state => state.roomMatch.partner.socketId);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleLogoutBtnClick = () => {
    socket.emit("leaveRoom", { userSocketId: user.socketId, partnerSocketId });
    dispatch(userActions.resetState());
    deleteUserCookie();
    googleLogout();
    setSidebarShow();

    history.push("/auth/login");
  };

  const handleSidebar = () => {
    setSidebarShow(prev => !prev);
  };

  return (
    <div className={styles.wrapper}>
      {isSidebarShow
        ? <div className={styles.container}>
            <MenuIcon className={classes.on} onClick={handleSidebar} />
            <Link to="/" onClick={handleSidebar} >
              <span>Home</span>
            </Link>
            {user.email &&
              <button onClick={handleLogoutBtnClick}>
                Logout
              </button>
            }
            <Link to="/ranking" onClick={handleSidebar} >
              <span>Ranking</span>
            </Link>
          </div>
        : <MenuIcon className={classes.off} onClick={handleSidebar} />
      }
    </div>
  );
};

export default Sidebar;
