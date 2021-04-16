import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../home/Home";
import Login from "../login/Login";
import Battle from "../battle/Battle";

const App = ({ user, setUser }) => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home user={user} />
      </Route>
      <Route path="/auth/login">
        <Login setUser={setUser} />
      </Route>
      <Route path="/battle">
        <Battle />
      </Route>
    </Switch>
  );
};

export default App;
