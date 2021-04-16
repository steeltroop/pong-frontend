import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { socket, subscribeSocket } from "../../config/socket";
import Home from "../home/Home";
import Login from "../login/Login";
import Battle from "../battle/Battle";
import Sidebar from "../sidebar/sidebar";

const App = () => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.email);

  subscribeSocket(dispatch);

  return (
    <>
      {!email && <Redirect to="/auth/login" />}
      <Switch>
        <Route path="/" exact>
          <Home socket={socket} />
        </Route>
        <Route path="/auth/login">
          <Login />
        </Route>
        <Route path="/battle" socket={socket}>
          <Battle />
        </Route>
        <Route path="/sidebar">
          <Sidebar />
        </Route>
      </Switch>
    </>
  );
};

export default App;
