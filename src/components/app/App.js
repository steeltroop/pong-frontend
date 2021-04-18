import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { socket } from "../../config/socket";
import Home from "../home/Home";
import Login from "../login/Login";
import Battle from "../battle/Battle";
import Sidebar from "../sidebar/sidebar";
import MenuIcon from '@material-ui/icons/Menu';

const App = () => {
  const [isSidebarShow, setSidebarShow] = useState(false);
  const email = useSelector(state => state.user.email);

  const handleSidebarBtnClick = () => {
    setSidebarShow(!isSidebarShow);
  };

  // {!email && <Redirect to="/auth/login" />}
  return (
    <>
      <MenuIcon onClick={handleSidebarBtnClick} />
      {isSidebarShow && <Sidebar socket={socket} />}
      <Switch>
        <Route path="/" exact>
          <Home socket={socket} />
        </Route>
        <Route path="/auth/login">
          <Login />
        </Route>
        <Route path="/battle">
          <Battle socket={socket} />
        </Route>
      </Switch>
    </>
  );
};

export default App;
