import React, { FC, useEffect, useState } from "react";

import api from "../api";
import _ from "lodash";
import { paginate } from "../utils/paginate";

import SearchStatus from "../components/SearchStatus";
import Pagination from "../components/Pagination";
import GroupList from "../components/GroupList";
import UsersTable from "../components/UsersTable";

import { IProfession, IProfessions } from "../api/fake.api/professions.api";
import { IUser } from "../api/fake.api/user.api";
import {
  changePageCallback,
  deleteCallback,
  onItemsSelectCallback,
  toggleFavoriteCallback,
} from "../types/callbacks";
import { ISortType } from "../types/interfaces";

const Users: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [professions, setProfessions] = useState<IProfessions | IProfession[]>(
    {}
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState<IProfession | undefined>();
  const [sortBy, setSortBy] = useState<ISortType>({
    path: "name",
    order: "asc",
  });

  useEffect(() => {
    api.professions
      .fetchAll()
      .then((data) => setProfessions(data))
      .catch((e) => console.log(e));
    api.users
      .fetchAll()
      .then((data) => setUsers(data))
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handlePageChange: changePageCallback = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleDelete: deleteCallback = (id) => {
    setUsers((prev) => prev.filter((el) => el._id !== id));
  };

  const handleToggleFavorite: toggleFavoriteCallback = (id) => {
    const newUsers = [...users];
    const userId = newUsers.findIndex((el) => el._id === id);
    newUsers[userId].bookmark = !newUsers[userId].bookmark;
    setUsers(newUsers);
  };

  const onItemsSelect: onItemsSelectCallback = (item) => {
    setSelectedProf(item);
  };

  const clearFilter = (): void => {
    setSelectedProf(undefined);
  };

  const handleSortClick = (item: ISortType): void => {
    setSortBy(item);
  };
  if (users.length !== 0) {
    const pageSize = 8;
    const filteredUsers =
      selectedProf !== undefined
        ? users.filter((user) => user.profession._id === selectedProf._id)
        : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
      <div className="d-flex">
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            items={professions}
            onItemsSelect={onItemsSelect}
            selectedItem={selectedProf}
          />
          <button onClick={clearFilter} className="btn btn-secondary mt-2">
            Очистить
          </button>
        </div>

        {count > 0 && (
          <div className="d-flex flex-column flex-grow-1">
            <SearchStatus length={count} />
            <UsersTable
              users={userCrop}
              handleDelete={handleDelete}
              handleToggleFavorite={handleToggleFavorite}
              selectedSort={sortBy}
              onSort={handleSortClick}
            />
            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    );
  } else return <div>loading...</div>;
};

export default Users;
