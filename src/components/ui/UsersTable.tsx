import React, { FC } from "react";

import Bookmark from "../common/Bookmark";
import Qualities from "./qualities";
import Table, { TableBody, TableHeader } from "../common/table/";

import { Link } from "react-router-dom";

import { IUser } from "../../hooks/useUsers";
import { IColumns, ISortType } from "../../types/interfaces";
import Profession from "./Profession";

interface IUsersTableProps {
  users: IUser[];
  handleDelete: (id: string) => void;
  handleToggleFavorite: (id: string) => void;
  selectedSort: ISortType;
  onSort: (name: ISortType) => void;
}

const UsersTable: FC<IUsersTableProps> = ({
  users,
  handleDelete,
  handleToggleFavorite,
  selectedSort,
  onSort,
}) => {
  const columns: IColumns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => <Link to={"/users/" + user._id}>{user.name}</Link>,
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />,
    },
    profession: {
      name: "Профессия",
      component: (user) => <Profession id={user.profession} />,
    },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          isBookmark={user.bookmark}
          _id={user._id}
          handleToggleFavorite={handleToggleFavorite}
        />
      ),
    },
    delete: {
      component: (user) => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(user._id)}
        >
          Delete
        </button>
      ),
    },
  };

  return (
    <Table>
      <TableHeader {...{ selectedSort, onSort, columns }} />
      <TableBody data={users} columns={columns} />
    </Table>
  );
};

export default UsersTable;
