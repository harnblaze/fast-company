import React, { FC } from "react";
import UsersListPage from "../components/pages/usersListPage/";
import UserPage from "../components/pages/userPage/";
import { useParams } from "react-router-dom";
import EditPage from "../components/pages/editPage";
import UserProvider from "../hooks/useUsers";

const Users: FC = () => {
  const { userId, edit } = useParams<{ userId?: string; edit?: string }>();
  return (
    <>
      <UserProvider>
        {userId !== undefined ? (
          edit !== undefined ? (
            <EditPage id={userId} />
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
