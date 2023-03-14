import React, { FC, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const LogOut: FC = () => {
  const { logOut } = useAuth();
  useEffect(() => {
    logOut();
  }, []);
  return <h1>Loading...</h1>;
};

export default LogOut;
