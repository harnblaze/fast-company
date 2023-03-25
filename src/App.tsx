import React, { FC, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Users from "./layouts/Users";
import NotFound from "./layouts/NotFound";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfessions";
import QualityProvider from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LogOut from "./layouts/LogOut";

import "react-toastify/dist/ReactToastify.css";
import { loadQualitiesList } from "./store/qualities";
import { useAppDispatch } from "./store/hooks";

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(loadQualitiesList());
  }, []);

  return (
    <>
      <AuthProvider>
        <Navbar />
        <ProfessionProvider>
          <QualityProvider>
            <Switch>
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
              <Route path="/" exact component={Main} />
              <Route path="/login:type?" component={Login} />
              <Route path="/logout" component={LogOut} />
              <Route path="/404" component={NotFound} />
              <Redirect to="/404" />
            </Switch>
          </QualityProvider>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
