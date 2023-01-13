import React, { FC, useState } from "react";

const Login: FC = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <form action="">
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default Login;
