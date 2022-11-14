import React, { FC, useState } from "react";
import api from "./api";
import SearchStatus from "./components/SearchStatus";
import Users from "./components/Users";
import { IUser } from "./api/fake.api/user.api";

export type deleteCallback = (id: string) => void;
export type toggleFavoriteCallback = (id: string) => void;

const App: FC = () => {
  const [users, setUsers] = useState<IUser[]>(api.users.fetchAll());

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
      {users.length > 0 && (
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
    </div>
  );
};

export default App;
