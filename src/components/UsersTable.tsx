import React, { FC } from "react";
import { IUser } from "../api/fake.api/user.api";
import Users from "./Users";
import { ISortType } from "../App";

interface IUsersTableProps {
  users: IUser[];
  handleDelete: (id: string) => void;
  handleToggleFavorite: (id: string) => void;
  currentSort: ISortType;
  onSort: (name: ISortType) => void;
}

const UsersTable: FC<IUsersTableProps> = ({
  users,
  handleDelete,
  handleToggleFavorite,
  currentSort,
  onSort,
}) => {
  const handleSort = (name: string): void => {
    if (currentSort.iter === name) {
      onSort({
        ...currentSort,
        order: currentSort.order === "asc" ? "desc" : "asc",
      });
    } else {
      onSort({ iter: name, order: "asc" });
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => handleSort("name")} scope="col">
            Имя
          </th>
          <th scope="col">Качества</th>
          <th onClick={() => handleSort("profession.name")} scope="col">
            Профессия
          </th>
          <th onClick={() => handleSort("completedMeetings")} scope="col">
            Встретился, раз
          </th>
          <th onClick={() => handleSort("rate")} scope="col">
            Оценка
          </th>
          <th onClick={() => handleSort("bookmark")} scope="col">
            Избранное
          </th>
          <th scope="col"></th>
        </tr>
      </thead>
      <Users
        users={users}
        handleDelete={handleDelete}
        handleToggleFavorite={handleToggleFavorite}
      />
    </table>
  );
};

export default UsersTable;
