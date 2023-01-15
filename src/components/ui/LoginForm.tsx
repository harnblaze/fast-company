import React, { FC, useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/TextField";

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

const LoginForm: FC = () => {
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

  const isValid = Object.values(errors).every((el) => el === "");

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6  p-4 shadow">
          <h3 className="mb-4">Login</h3>
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
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
