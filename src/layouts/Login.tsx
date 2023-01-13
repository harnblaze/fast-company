import React, { FC, useEffect, useState } from "react";
import TextField from "../components/TextField";

const Login: FC = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [, setErrors] = useState({ email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = (): boolean => {
    const errors = { email: "", password: "" };
    for (const fieldName in data) {
      if (data[fieldName as keyof typeof data].trim() === "") {
        errors[
          fieldName as keyof typeof data
        ] = `${fieldName} обязательно для заполнения`;
      }
    }
    setErrors(errors);
    return Object.values(errors).every((el) => el === "");
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Отправить</button>
    </form>
  );
};

export default Login;
