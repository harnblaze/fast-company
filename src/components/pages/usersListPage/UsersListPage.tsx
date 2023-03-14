import React, { FC, useEffect, useState } from "react";
import _ from "lodash";
import { paginate } from "../../../utils/paginate";

import SearchStatus from "../../ui/SearchStatus";
import Pagination from "../../common/Pagination";
import GroupList from "../../common/GroupList";
import UsersTable from "../../ui/UsersTable";

import { IProfession } from "../../../api/fake.api/professions.api";
import { IUser, useUser } from "../../../hooks/useUsers";
import {
  changePageCallback,
  onItemsSelectCallback,
  toggleFavoriteCallback,
} from "../../../types/callbacks";
import { ISortType } from "../../../types/interfaces";
import { useProfession } from "../../../hooks/useProfessions";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage: FC = () => {
  const { users } = useUser();
  const { currentUser } = useAuth();
  const { professions, isLoading: professionsLoading } = useProfession();
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState<IProfession | undefined>();
  const [sortBy, setSortBy] = useState<ISortType>({
    path: "name",
    order: "asc",
  });
  const pageSize = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, search]);

  const handlePageChange: changePageCallback = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleToggleFavorite: toggleFavoriteCallback = (id) => {
    const newUsers = [...users];
    const userId = newUsers.findIndex((el) => el._id === id);
    newUsers[userId].bookmark = !newUsers[userId].bookmark;
    // setUsers(newUsers);
  };

  const handleSearchInput = (value: string): void => {
    setSelectedProf(undefined);
    setSearch(value);
  };

  const onItemsSelect: onItemsSelectCallback = (item) => {
    setSelectedProf(item);
    setSearch("");
  };

  const clearFilter = (): void => {
    setSelectedProf(undefined);
  };

  const handleSortClick = (item: ISortType): void => {
    setSortBy(item);
  };

  const filterUsers = (data: IUser[]): IUser[] | undefined => {
    let filteredUsers;
    if (data.length !== 0) {
      if (search !== "") {
        filteredUsers = data.filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        );
      } else if (selectedProf !== undefined) {
        filteredUsers = data.filter(
          (user) => user.profession === selectedProf._id
        );
      } else {
        filteredUsers = data;
      }
    }
    return filteredUsers?.filter((el) => el._id !== currentUser?._id);
  };
  const filteredUsers = filterUsers(users);
  const count = filteredUsers?.length ?? 1;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const userCrop = paginate(sortedUsers, currentPage, pageSize);

  return (
    <div className="d-flex">
      {professions.length !== 0 && !professionsLoading && (
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
      )}

      <div className="d-flex flex-column flex-grow-1">
        <SearchStatus length={count} />
        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={search}
          onChange={(evt) => handleSearchInput(evt.target.value)}
        />
        <UsersTable
          users={userCrop}
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
    </div>
  );
};

export default UsersListPage;
