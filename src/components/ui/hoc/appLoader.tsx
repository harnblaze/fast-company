import React, { FC, PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loadQualitiesList } from "../../../store/qualities";
import { loadProfessionsList } from "../../../store/professions";
import {
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList,
} from "../../../store/users";

const AppLoader: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsLoggedIn());
  const usersStatusLoading = useAppSelector(getUsersLoadingStatus());
  useEffect(() => {
    void dispatch(loadQualitiesList());
    void dispatch(loadProfessionsList());
    if (isLoggedIn) {
      void dispatch(loadUsersList());
    }
  }, [isLoggedIn]);
  if (usersStatusLoading) return <>Loading...</>;
  return <>{children}</>;
};

export default AppLoader;
