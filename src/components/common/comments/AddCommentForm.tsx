import React, { FC, useEffect, useState } from "react";
import { IUser } from "../../../api/fake.api/user.api";
import {
  dataCommentForm,
  errorCommentForm,
} from "../../../types/validatorTypes";
import {
  validator,
  validatorConfigCommentForm,
} from "../../../utils/validator";
import api from "../../../api";
import { onFormFieldChangeCallback } from "../../../types/callbacks";
import SelectField from "../form/SelectField";
import TextAreaField from "../form/TextAreaField";

const initialData = {
  userId: "",
  content: "",
};
interface IAddCommentFormProps {
  onSubmit: (data: dataCommentForm) => void;
}

const AddCommentForm: FC<IAddCommentFormProps> = ({ onSubmit }) => {
  const [data, setData] = useState<dataCommentForm>(initialData);
  const [users, setUsers] = useState<IUser[]>();
  const [errors, setErrors] = useState<errorCommentForm>(initialData);

  const handleChange: onFormFieldChangeCallback = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validate = (): boolean => {
    const errors = validator(data, validatorConfigCommentForm);
    setErrors(errors as errorCommentForm);
    return Object.values(errors).every((el) => el === "");
  };

  useEffect(() => {
    api.users
      .fetchAll()
      .then(setUsers)
      .catch((e) => console.log(e));
  }, []);

  const clearForm = (): void => {
    setData(initialData);
    setErrors(initialData);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  return (
    <div>
      <h2>New Comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          onChange={handleChange}
          defaultOption={"Выберите пользователя"}
          name={"userId"}
          value={data.userId}
          error={errors.userId}
          options={users ?? []}
        />
        <TextAreaField
          label={"Введите сообщение"}
          name={"content"}
          value={data.content}
          onChange={handleChange}
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Опубликовать</button>
        </div>
      </form>
    </div>
  );
};

export default AddCommentForm;
