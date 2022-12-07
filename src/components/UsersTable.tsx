import React, { FC } from "react";
import { IUser } from "../api/fake.api/user.api";
import Users from "./Users";
import { ISortType } from "../App";
import TableHeader from "./TableHeader";

interface IUsersTableProps {
  users: IUser[];
  handleDelete: (id: string) => void;
  handleToggleFavorite: (id: string) => void;
  selectedSort: ISortType;
  onSort: (name: ISortType) => void;
}
export interface IColumns {
  [name: string]: { iter?: string; name?: string };
}

const columns: IColumns = {
  name: { iter: "name", name: "Имя" },
  qualities: { name: "Качества" },
  professions: { iter: "professions.name", name: "Профессия" },
  completedMeetings: { iter: "completedMeetings", name: "Встретился, раз" },
  rate: { iter: "rate", name: "Оценка" },
  bookmark: { iter: "bookmark", name: "Избранное" },
  delete: {},
};

const UsersTable: FC<IUsersTableProps> = ({
  users,
  handleDelete,
  handleToggleFavorite,
  selectedSort,
  onSort,
}) => {
  return (
    <table className="table">
      <TableHeader {...{ selectedSort, onSort, columns }} />
      <Users
        users={users}
        handleDelete={handleDelete}
        handleToggleFavorite={handleToggleFavorite}
      />
    </table>
  );
};

export default UsersTable;
