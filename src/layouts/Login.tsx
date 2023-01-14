import React, { FC, useEffect, useState } from "react";
import TextField from "../components/TextField";
import { validator } from "../utils/validator";

export interface dataState {
  [fieldName: string]: string;
}
const validatorConfig = {
  email: {
    isRequired: {
      message: "Электронная почта обязательна для заполнения",
    },
    isEmail: {
      message: "Электронная почта введена некоректно",
    },
  },
  password: {
    isRequired: {
      message: "Пароль обязателен для заполнения",
    },
    isCapitalSymbol: {
      message: "Пароль должен содержать хотя бы одну заглавную букву",
    },
    isDigitSymbol: {
      message: "Пароль должен содержать хотя бы одну цифру",
    },
    isMinSymbol: {
      message: "Пароль должен состоять из 8ми символов",
    },
  },
};

export type validatorConfigType = typeof validatorConfig;
export interface validatorFieldConfigType {
  message: string;
}

const Login: FC = () => {
  const [data, setData] = useState<dataState>({ email: "", password: "" });
  const [errors, setErrors] = useState<dataState>({ email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = (): boolean => {
    const errors = validator(data, validatorConfig);

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
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <button type="submit">Отправить</button>
    </form>
  );
};

export default Login;
