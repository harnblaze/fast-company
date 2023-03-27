import React, { FC } from "react";
import UsersListPage from "../components/pages/usersListPage/";
import UserPage from "../components/pages/userPage/";
import { Redirect, useParams } from "react-router-dom";
import EditPage from "../components/pages/editPage";
import UserProvider from "../hooks/useUsers";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { useAppSelector } from "../store/hooks";
import { getCurrentUserId } from "../store/users";

const Users: FC = () => {
  const { userId, edit } = useParams<{ userId?: string; edit?: string }>();
  const currentUserId = useAppSelector(getCurrentUserId());

  return (
    <>
      <UsersLoader>
        <UserProvider>
          {userId !== undefined ? (
            edit !== undefined ? (
              userId === currentUserId ? (
                <EditPage id={userId} />
              ) : (
                <Redirect to={`/users/${currentUserId ?? ""}/edit`} />
              )
            ) : (
              <UserPage id={userId} />
            )
          ) : (
            <UsersListPage />
          )}
        </UserProvider>
      </UsersLoader>
    </>
  );
};

export default Users;
