import React, { FC } from "react";
import User from "./User";
import { IUser } from "../api/fake.api/user.api";
import { deleteCallback, toggleFavoriteCallback } from "../App";

interface UsersProps {
  users: IUser[];
  handleDelete: deleteCallback;
  handleToggleFavorite: toggleFavoriteCallback;
}

const Users: FC<UsersProps> = ({
  users,
  handleDelete,
  handleToggleFavorite,
}) => {
  return (
    <tbody>
      {users.map((user) => (
        <User
          {...user}
          handleDelete={handleDelete}
          handleToggleFavorite={handleToggleFavorite}
          key={user._id}
        />
      ))}
    </tbody>
  );
};

export default Users;
