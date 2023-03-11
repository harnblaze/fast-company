import React, { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Users from "./layouts/Users";
import NotFound from "./layouts/NotFound";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfessions";
import QualityProvider from "./hooks/useQuality";

const App: FC = () => {
  return (
    <>
      <Navbar />
      <ProfessionProvider>
        <QualityProvider>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login:type?" component={Login} />
            <Route path="/users/:userId?/:edit?" component={Users} />

            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </QualityProvider>
      </ProfessionProvider>
      <ToastContainer />
    </>
  );
};

export default App;
