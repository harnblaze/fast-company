import React, { FC } from "react";
import UsersListPage from "../components/pages/usersListPage/";
import UserPage from "../components/pages/userPage/";
import { useParams } from "react-router-dom";
import EditPage from "../components/pages/editPage";

const Users: FC = () => {
  const { userId, edit } = useParams<{ userId?: string; edit?: string }>();

  if (userId !== undefined) {
    if (edit !== undefined) {
      return <EditPage id={userId} />;
    }
    return <UserPage id={userId} />;
  }
  return <UsersListPage />;
};

export default Users;
