import React, { FC } from "react";
import useMockData from "../utils/mockData";

const Main: FC = () => {
  const { error, initialize, progress, status } = useMockData();
  const handleClick = (): void => {
    void initialize();
  };
  return (
    <div className={"container mt-5"}>
      <h1>Main</h1>
      <h3>Инициализация данных в FireBase</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}%</li>
        {error !== null ? <li>Error:{error}</li> : ""}
      </ul>
      <button className={"btn btn-primary"} onClick={handleClick}>
        Инициализировать
      </button>
    </div>
  );
};

export default Main;
