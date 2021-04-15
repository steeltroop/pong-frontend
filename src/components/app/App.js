import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../home/Home";
import Login from "../login/Login";

const App = ({ setUser }) => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/auth/login">
        <Login setUser={setUser} />
      </Route>
    </Switch>
  );
};

export default App;
