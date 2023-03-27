import React, { FC, useEffect, useState } from "react";

import { validator, validatorConfig } from "../../utils/validator";
import TextField from "../common/form/TextField";
import {
  dataRegisterState,
  errorRegisterState,
} from "../../types/validatorTypes";
import SelectField from "../common/form/SelectField";
import RadioField from "../common/form/RadioField";
import MultiSelectField from "../common/form/MultiSelectField";
import { onFormFieldChangeCallback } from "../../types/callbacks";
import CheckboxField from "../common/form/checkboxField";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { singUp } from "../../store/users";

const RegisterForm: FC = () => {
  const [data, setData] = useState<dataRegisterState>({
    name: "",
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false,
  });
  const qualities = useAppSelector(getQualities());
  const professions = useAppSelector(getProfessions());
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    qualities: "",
    license: "",
  });

  const handleChange: onFormFieldChangeCallback = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = (): boolean => {
    const errors = validator(data, validatorConfig);

    setErrors(errors as errorRegisterState);
    return Object.values(errors).every((el) => el === "");
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
    void dispatch(singUp(newData));
  };

  const isValid = Object.values(errors).every((el) => el === "");
  const qualitiesList = qualities.map((quality) => ({
    label: quality.name,
    value: quality._id,
  }));

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
    >
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
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
        name="profession"
        onChange={handleChange}
        value={data.profession}
        options={professions}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" },
        ]}
        name={"sex"}
        onChange={handleChange}
        value={data.sex}
        label={"Выберите ваш пол"}
      />
      <MultiSelectField
        error={errors.qualities}
        label="Выберите ваши качества"
        options={qualitiesList}
        onChange={handleChange}
        name="qualities"
        defaultValue={data.qualities}
      />
      <CheckboxField
        name="license"
        value={data.license}
        onChange={handleChange}
        error={errors.license}
      >
        Подтвердить <a>лицензионное соглашение</a>
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

export default RegisterForm;
