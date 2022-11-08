import React, { FC, useState } from "react";
import api from "../api";
import { IQuality } from "../api/fake.api/user.api";

const Users: FC = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const renderQualities = (qualities: IQuality[]) =>
    qualities.map((quality) => {
      const classes = "badge m-1 bg-" + quality.color;
      return (
        <span key={quality._id} className={classes}>
          {quality.name}
        </span>
      );
    });

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((el) => el._id !== id));
  };

  const renderPhrase = (usersCount: number) => {
    let text: string;
    const count = usersCount % 10;

    if (usersCount === 0) {
      text = "Никто с тобой не тусанет";
    } else {
      if (usersCount > 4 && usersCount < 20) {
        text = `${usersCount} человек тусанет с тобой сегодня`;
      } else if (count > 1 && count < 5) {
        text = `${usersCount} человека тусанут с тобой сегодня`;
      } else {
        text = `${usersCount} человек тусанет с тобой сегодня`;
      }
    }

    return (
      <h2>
        <span className={`badge bg-${usersCount === 0 ? "danger" : "primary"}`}>
          {text}
        </span>
      </h2>
    );
  };

  return (
    <>
      {renderPhrase(users.length)}
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
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
