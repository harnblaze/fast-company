import React, { FC, useState } from "react";
import TextField from "../components/TextField";

const Login: FC = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <form action="">
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
      />
    </form>
  );
};

export default Login;
