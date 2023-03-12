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
import { useProfession } from "../../hooks/useProfessions";
import { useQuality } from "../../hooks/useQuality";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm: FC = () => {
  const [data, setData] = useState<dataRegisterState>({
    email: "",
    password: "",
    profession: "",
    gender: "male",
    qualities: [],
    license: false,
  });
  const { qualities } = useQuality();
  const { professions } = useProfession();
  const { signUp } = useAuth();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    profession: "",
    qualities: "",
    license: "",
  });
  const history = useHistory();

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

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
    try {
      await signUp(newData);
      history.push("/");
    } catch (error: any) {
      setErrors(error);
      console.log(error);
    }
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
        name={"gender"}
        onChange={handleChange}
        value={data.gender}
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
