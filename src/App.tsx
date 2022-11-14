import React, { FC, useState } from "react";
import api from "./api";
import SearchStatus from "./components/SearchStatus";
import Users from "./components/Users";
import { IUser } from "./api/fake.api/user.api";

export type deleteCallback = (id: string) => void;

const App: FC = () => {
  const [users, setUsers] = useState<IUser[]>(api.users.fetchAll());

  const handleDelete: deleteCallback = (id) => {
    setUsers((prev) => prev.filter((el) => el._id !== id));
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
              <th scope="col"></th>
            </tr>
          </thead>
          <Users users={users} handleDelete={handleDelete} />
        </table>
      )}
    </div>
  );
};

export default App;
