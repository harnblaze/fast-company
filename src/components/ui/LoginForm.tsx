import React, { FC, useEffect, useState } from "react";
import { validator, validatorConfig } from "../../utils/validator";
import TextField from "../common/form/TextField";
import { dataLoginState, errorLoginState } from "../../types/validatorTypes";
import { onFormFieldChangeCallback } from "../../types/callbacks";
import CheckboxField from "../common/form/checkboxField";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAuthErrors, signIn } from "../../store/users";

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
  const history = useHistory<any>();
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(getAuthErrors());
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
    const redirect =
      history.location?.state?.from?.pathname !== undefined &&
      history.location?.state?.from?.pathname !== "/login"
        ? history.location.state.from.pathname
        : "/";
    void dispatch(signIn({ payload: data, redirect }));
  };

  const isValid = Object.values(errors).every((el) => el === "");

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
      <CheckboxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Оставаться в системе
      </CheckboxField>
      {loginError !== null && <p className="text-danger">{loginError}</p>}
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
