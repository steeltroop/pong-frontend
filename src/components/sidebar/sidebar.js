import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as userActions from "../../redux/actions/userActions";
import { deleteUserCookie } from "../../utils/deleteUserCookie";
import { googleLogout } from "../../api/firebase/googleAuth";

const Sidebar = () => {
  const user = useSelector(state => state.user.email);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogoutBtnClick = () => {
    dispatch(userActions.deleteUser());
    deleteUserCookie();
    googleLogout();
    history.push("/auth/login");
  };

  return (
    <div>
      <Link to="/">
        <span>Home</span>
      </Link>
      {user &&
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
