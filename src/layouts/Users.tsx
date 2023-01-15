import React, { FC } from "react";
import UsersListPage from "../components/pages/usersListPage/";
import UserPage from "../components/pages/userPage/";
import { useParams } from "react-router-dom";

const Users: FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  return (
    <>{userId !== undefined ? <UserPage id={userId} /> : <UsersListPage />}</>
  );
};

export default Users;
