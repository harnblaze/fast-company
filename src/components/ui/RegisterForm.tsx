import React, { FC, useEffect, useState } from "react";

import { validator, validatorConfig } from "../../utils/validator";
import TextField from "../common/form/TextField";
import { dataState } from "../../types/validatorTypes";
import { IProfession } from "../../api/fake.api/professions.api";
import api from "../../api";
import SelectField from "../common/form/SelectField";

const RegisterForm: FC = () => {
  const [data, setData] = useState<dataState>({
    email: "",
    password: "",
    profession: "",
  });
  const [professions, setProfessions] = useState<IProfession[]>([]);
  const [errors, setErrors] = useState<dataState>({
    email: "",
    password: "",
    profession: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    api.professions
      .fetchAll()
      .then((data) => setProfessions(data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    validate();
    console.log(errors);
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
      <SelectField
        label="Профессия"
        defaultOption="Выберите профессию..."
        onChange={handleChange}
        value={data.profession}
        professions={professions}
        error={errors.profession}
      />
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

export default RegisterForm;
