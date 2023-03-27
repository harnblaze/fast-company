import React, { FC, useEffect } from "react";
import UsersListPage from "../components/pages/usersListPage/";
import UserPage from "../components/pages/userPage/";
import { Redirect, useParams } from "react-router-dom";
import EditPage from "../components/pages/editPage";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getDataLoaded, loadUsersList } from "../store/users";

const Users: FC = () => {
  const { userId, edit } = useParams<{ userId?: string; edit?: string }>();
  const { currentUser } = useAuth();
  const dataStatus = useAppSelector(getDataLoaded());
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!dataStatus) {
      void dispatch(loadUsersList());
    }
  }, []);
  if (!dataStatus) return <>Loading...</>;
  return (
    <>
      <UserProvider>
        {userId !== undefined ? (
          edit !== undefined ? (
            userId === currentUser?._id ? (
              <EditPage id={userId} />
            ) : (
              <Redirect to={`/users/${currentUser?._id ?? ""}/edit`} />
            )
          ) : (
            <UserPage id={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  );
};

export default Users;
