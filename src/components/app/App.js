import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { socket } from "../../config/socket";
import Home from "../home/Home";
import Login from "../login/Login";
import Battle from "../battle/Battle";
import Sidebar from "../sidebar/Sidebar";
import styles from "./App.module.css";

const App = () => {
  const email = useSelector(state => state.user.email);

  // {!email && <Redirect to="/auth/login" />}
  return (
    <div className={styles.wrapper} >
      <Sidebar socket={socket} />
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
    </div>
  );
};

export default App;
