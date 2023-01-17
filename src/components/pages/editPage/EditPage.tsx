import React, { FC, useEffect, useState } from "react";
import { IProfession } from "../../../api/fake.api/professions.api";
import { IQualities, IQuality } from "../../../api/fake.api/qualities";
import { onFormFieldChangeCallback } from "../../../types/callbacks";
import TextField from "../../common/form/TextField";
import SelectField from "../../common/form/SelectField";
import api from "../../../api";
import RadioField from "../../common/form/RadioField";

interface EditPageProps {
  id: string;
}

const EditPage: FC<EditPageProps> = ({ id }) => {
  const [data, setData] = useState({
    email: "",
    name: "",
    _id: id,
    gender: "male",
    profession: "",
    qualities: [{ name: "", value: "" }],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [professions, setProfessions] = useState<IProfession[]>([]);
  const [, setQualities] = useState<IQualities>({});

  const transformQualities = (
    data: IQuality[]
  ): Array<{ name: string; value: string }> => {
    return data.map((quality) => ({
      name: quality.name,
      value: quality._id,
    }));
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    console.log(data);
  };

  const handleChange: onFormFieldChangeCallback = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  useEffect(() => {
    setIsLoading(true);
    api.users
      .getById(id)
      .then(({ profession, qualities, ...data }) =>
        setData((prevState) => ({
          ...prevState,
          ...data,
          qualities: transformQualities(qualities),
          profession: profession._id,
        }))
      )
      .catch((e) => console.log(e));
    api.qualities
      .fetchAll()
      .then((data) => setQualities(data))
      .catch((e) => console.log(e));
    api.professions
      .fetchAll()
      .then((data) => setProfessions(data))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6  col-md-6 col-sm-10 mx-auto p-4 shadow">
          {isLoading ? (
            "Loading...."
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
              <SelectField
                label="Профессия"
                defaultOption="Выберите свою профессию..."
                name="profession"
                onChange={handleChange}
                value={data.profession}
                options={professions}
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

              <button type="submit" className="btn btn-primary w-100 mx-auto">
                Отправить
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPage;
