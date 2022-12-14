import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Users from "./layouts/Users";

const App: FC = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/main" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId?" component={Users} />
      </Switch>
    </>
  );
};

export default App;
