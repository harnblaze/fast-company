import React, { FC, useEffect, useState } from "react";
import api from "./api";
import { IUser } from "./api/fake.api/user.api";
import SearchStatus from "./components/SearchStatus";
import Users from "./components/Users";
import Pagination from "./components/Pagination";
import GroupList from "./components/GroupList";
import { paginate } from "./utils/paginate";
import { IProfession, IProfessions } from "./api/fake.api/professions.api";

export type deleteCallback = (id: string) => void;
export type toggleFavoriteCallback = (id: string) => void;
export type changePageCallback = (index: number) => void;
export type onItemsSelectCallback = (item: IProfession) => void;

const App: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [professions, setProfessions] = useState<IProfessions | IProfession[]>(
    {}
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState<IProfession | undefined>();
  const pageSize = 4;
  const filteredUsers =
    selectedProf !== undefined
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : users;
  const count = filteredUsers.length;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

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
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <Users
              users={userCrop}
              handleDelete={handleDelete}
              handleToggleFavorite={handleToggleFavorite}
            />
          </table>
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
};

export default App;
