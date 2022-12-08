import React, { FC, ReactNode } from "react";
import { IUser } from "../api/fake.api/user.api";
import { ISortType } from "../App";
import { PropertyName } from "lodash";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Bookmark from "./Bookmark";
import QualitiesList from "./QualitiesList";

interface IUsersTableProps {
  users: IUser[];
  handleDelete: (id: string) => void;
  handleToggleFavorite: (id: string) => void;
  selectedSort: ISortType;
  onSort: (name: ISortType) => void;
}
export interface IColumns {
  [name: PropertyName]: {
    path?: string;
    name?: string;
    component?: ((user: IUser) => ReactNode) | string;
  };
}

const UsersTable: FC<IUsersTableProps> = ({
  users,
  handleDelete,
  handleToggleFavorite,
  selectedSort,
  onSort,
}) => {
  const columns: IColumns = {
    name: { path: "name", name: "Имя" },
    qualities: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />,
    },
    profession: { path: "profession.name", name: "Профессия" },
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
    <table className="table">
      <TableHeader {...{ selectedSort, onSort, columns }} />
      <TableBody data={users} columns={columns} />
    </table>
  );
};

export default UsersTable;
