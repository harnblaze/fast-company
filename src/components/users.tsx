import React, { FC, useState } from "react";
import api from "../api";
import { IQuality } from "../api/fake.api/user.api";

const Users: FC = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const renderQualities = (qualities: IQuality[]) =>
    qualities.map((quality) => {
      const classes = "badge bg-" + quality.color;
      return (
        <span key={quality._id} className={classes}>
          {quality.name}
        </span>
      );
    });

  //const handleDelete = () =>{}
  //const renderPhrase = () =>{}
  return (
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
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{renderQualities(user.qualities)}</td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}</td>
              <td>
                <button type="button" className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Users;
