import React, { FC, PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getDataLoaded, loadUsersList } from "../../../store/users";

const UsersLoader: FC<PropsWithChildren> = ({ children }) => {
  const dataStatus = useAppSelector(getDataLoaded());
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!dataStatus) {
      void dispatch(loadUsersList());
    }
  }, []);
  if (!dataStatus) return <>Loading...</>;
  return <>{children}</>;
};

export default UsersLoader;
