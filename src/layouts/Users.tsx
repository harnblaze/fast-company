import React, { FC } from "react";
import UsersList from "../components/UsersList";
import UserPage from "../components/UserPage";
import { useParams } from "react-router-dom";

const Users: FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  return <>{userId !== undefined ? <UserPage id={userId} /> : <UsersList />}</>;
};

export default Users;
