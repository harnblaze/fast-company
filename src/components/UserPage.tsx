import React, { FC, useEffect, useState } from "react";
import { IUser } from "../api/fake.api/user.api";
import api from "../api";
import QualitiesList from "./QualitiesList";
import { useHistory } from "react-router-dom";

interface IUserPage {
  id: string;
}
const UserPage: FC<IUserPage> = ({ id }) => {
  const [user, setUser] = useState<IUser>();
  const { push } = useHistory();
  useEffect(() => {
    api.users
      .getById(id)
      .then((data) => setUser(data))
      .catch((e) => console.log(e));
  }, []);

  const handleButtonAllUsersClick = (): void => {
    push("/users");
  };

  if (user === undefined) return <h1>loading...</h1>;

  return (
    <>
      <h1>{user.name}</h1>
      <h2>{`Профессия: ${user.profession.name}`}</h2>
      <QualitiesList qualities={user.qualities} />
      <div>{`Completed meetings: ${user.completedMeetings}`}</div>
      <h2>{`Rate: ${user.rate}`}</h2>
      <button onClick={handleButtonAllUsersClick}>Все пользователи</button>
    </>
  );
};

export default UserPage;
