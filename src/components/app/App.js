import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { socket } from "../../config/socket";
import Home from "../home/Home";
import Login from "../login/Login";
import Battle from "../battle/Battle";
import Sidebar from "../sidebar/sidebar";
import MenuIcon from '@material-ui/icons/Menu';

const App = () => {
  const [isSidebarShow, setSidebarShow] = useState(false);
  const dispatch = useDispatch();

  subscribeSocket(dispatch);

  const handleSidebarBtnClick = () => {
    setSidebarShow(!isSidebarShow);
  };

  const email = useSelector(state => state.user.email);

  return (
    <>
      <MenuIcon onClick={handleSidebarBtnClick} />
      {isSidebarShow && <Sidebar />}
      {!email && <Redirect to="/auth/login" />}
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
