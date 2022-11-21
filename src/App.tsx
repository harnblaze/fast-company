import React, { FC, useState } from "react";
import api from "./api";
import SearchStatus from "./components/SearchStatus";
import Users from "./components/Users";
import { IUser } from "./api/fake.api/user.api";
import Pagination from "./components/Pagination";

export type deleteCallback = (id: string) => void;
export type toggleFavoriteCallback = (id: string) => void;
export type changePageCallback = (index: number) => void;

const App: FC = () => {
  const [users, setUsers] = useState<IUser[]>(api.users.fetchAll());
  const count = users.length;
  const pageSize = 4;

  const handlePageChange: changePageCallback = (pageIndex) => {
    console.log("page", pageIndex);
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

  return (
    <div>
      <SearchStatus length={users.length} />
      {count > 0 && (
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
            users={users}
            handleDelete={handleDelete}
            handleToggleFavorite={handleToggleFavorite}
          />
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
