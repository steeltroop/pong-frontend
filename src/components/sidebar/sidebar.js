import React, { useState } from "react";
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useHistory } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarShow, setSidebarShow] = useState(false);
  const history = useHistory();

  const handleSidebarBtnClick = () => {
    setSidebarShow(!isSidebarShow);
  };

  const handleLogoutBtnClick = () => {
    history.push("/auth/login");
  };

  return (
    <div>
      <div onClick={handleSidebarBtnClick}>
        <MenuIcon />
      </div>
      <Link to="/auth/login">
        <div>
          <span>Login</span>
        </div>
      </Link>
      <div>
        <button onClick={handleLogoutBtnClick}>
          Logout
        </button>
      </div>
      <Link to="/ranking">
        <div>
          <span>Ranking</span>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
