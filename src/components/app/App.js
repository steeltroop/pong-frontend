import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../home/Home";
import Login from "../login/Login";

const App = ({ user, setUser }) => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home user={user} />
      </Route>
      <Route path="/auth/login">
        <Login setUser={setUser} />
      </Route>
    </Switch>
  );
};

export default App;
