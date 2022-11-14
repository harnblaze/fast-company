import React, { FC } from "react";
import User from "./User";
import { IUser } from "../api/fake.api/user.api";
import { deleteCallback } from "../App";

interface UsersProps {
  users: IUser[];
  handleDelete: deleteCallback;
}

const Users: FC<UsersProps> = ({ users, handleDelete }) => {
  return (
    <tbody>
      {users.map((user) => (
        <User {...user} handleDelete={handleDelete} key={user._id} />
      ))}
    </tbody>
  );
};

export default Users;
