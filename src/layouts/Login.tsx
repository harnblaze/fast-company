import React, { FC } from "react";

const Login: FC = () => {
  return (
    <form action="">
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" />
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <input type="password" id="password" />
      </div>
    </form>
  );
};

export default Login;
