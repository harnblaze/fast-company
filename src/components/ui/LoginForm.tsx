import React, { FC, useEffect, useState } from "react";
import { validator, validatorConfig } from "../../utils/validator";
import TextField from "../common/form/TextField";
import { dataLoginState, errorLoginState } from "../../types/validatorTypes";
import { onFormFieldChangeCallback } from "../../types/callbacks";
import CheckboxField from "../common/form/checkboxField";

const LoginForm: FC = () => {
  const [data, setData] = useState<dataLoginState>({
    email: "",
    password: "",
    stayOn: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange: onFormFieldChangeCallback = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = (): boolean => {
    const errors = validator(data, validatorConfig);

    setErrors(errors as errorLoginState);
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
      <CheckboxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Оставаться в системе
      </CheckboxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Отправить
      </button>
    </form>
  );
};

export default LoginForm;
