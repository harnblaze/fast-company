import React, { FC, useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { logOut } from "../store/users";

const LogOut: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logOut());
  }, []);
  return <h1>Loading...</h1>;
};

export default LogOut;
