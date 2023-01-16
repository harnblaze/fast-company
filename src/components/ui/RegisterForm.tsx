import React, { FC, useEffect, useState } from "react";

import { validator, validatorConfig } from "../../utils/validator";
import TextField from "../common/form/TextField";
import { dataRegisterState } from "../../types/validatorTypes";
import { IProfession } from "../../api/fake.api/professions.api";
import api from "../../api";
import SelectField from "../common/form/SelectField";
import RadioField from "../common/form/RadioField";
import { IQualities } from "../../api/fake.api/qualities";
import MultiSelectField from "../common/form/MultiSelectField";
import { onFormFieldChangeCallback } from "../../types/callbacks";

const RegisterForm: FC = () => {
  const [data, setData] = useState<dataRegisterState>({
    email: "",
    password: "",
    profession: "",
    gender: "male",
    qualities: [],
  });
  const [qualities, setQualities] = useState<IQualities>({});
  const [professions, setProfessions] = useState<IProfession[]>([]);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    profession: "",
    qualities: "",
  });

  const handleChange: onFormFieldChangeCallback = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  useEffect(() => {
    api.professions
      .fetchAll()
      .then((data) => setProfessions(data))
      .catch((e) => console.log(e));
    api.qualities
      .fetchAll()
      .then((data) => setQualities(data))
      .catch((e) => console.log(e));
  }, []);

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
        defaultOption="Выберите свою профессию..."
        onChange={handleChange}
        value={data.profession}
        professions={professions}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" },
        ]}
        name={"gender"}
        onChange={handleChange}
        value={data.gender}
        label={"Выберите ваш пол"}
      />
      <MultiSelectField
        error={errors.qualities}
        label="Выберите ваши качества"
        options={qualities}
        onChange={handleChange}
        name="qualities"
        defaultValue={[]}
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
