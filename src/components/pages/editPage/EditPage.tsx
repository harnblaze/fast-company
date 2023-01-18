import React, { FC, useEffect, useState } from "react";
import { IProfession } from "../../../api/fake.api/professions.api";
import { IQualities, IQuality } from "../../../api/fake.api/qualities";
import { onFormFieldChangeCallback } from "../../../types/callbacks";
import TextField from "../../common/form/TextField";
import SelectField from "../../common/form/SelectField";
import api from "../../../api";
import RadioField from "../../common/form/RadioField";
import MultiSelectField from "../../common/form/MultiSelectField";
import { useHistory } from "react-router-dom";
import { validator, validatorConfigEditPage } from "../../../utils/validator";
import {
  dataEditPageState,
  errorEditPage,
  IQualitiesData,
} from "../../../types/validatorTypes";

interface EditPageProps {
  id: string;
}

const EditPage: FC<EditPageProps> = ({ id }) => {
  const history = useHistory();
  const [data, setData] = useState<dataEditPageState>({
    email: "",
    name: "",
    _id: id,
    sex: "male",
    profession: "",
    qualities: [{ label: "", value: "", color: "" }],
    bookmark: false,
    rate: 0,
    completedMeetings: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [professions, setProfessions] = useState<IProfession[]>([]);
  const [qualities, setQualities] = useState<IQualities>({});
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    profession: "",
    qualities: "",
  });

  const transformQualities = (data: IQuality[]): IQualitiesData[] => {
    return data.map((quality) => ({
      label: quality.name,
      value: quality._id,
      color: quality.color,
    }));
  };
  const getProfessionById = (id: string): IProfession => {
    const profession = professions.find((prof) => prof?._id === id);
    return profession as IProfession;
  };
  const getQualities = (quals: IQualitiesData[]): IQuality[] => {
    const qualitiesList: IQuality[] = [];
    quals.forEach((qual) => {
      for (const quality in qualities) {
        if (qual.value === qualities[quality]._id) {
          qualitiesList.push(qualities[quality]);
        }
      }
    });
    return qualitiesList;
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    void api.users
      .update(id, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities),
      })
      .then(() => history.push(`/users/${id}`));
  };

  const validate = (): boolean => {
    const errors = validator(data, validatorConfigEditPage);
    console.log(errors);
    setErrors(errors as errorEditPage);
    return Object.values(errors).every((el) => el === "");
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
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    if (data._id !== "" && professions.length > 0) setIsLoading(false);
    validate();
  }, [data, professions]);

  const isValid = Object.values(errors).every((el) => el === "");

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
                error={errors.name}
                onChange={handleChange}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                error={errors.email}
                onChange={handleChange}
              />
              <SelectField
                label="Профессия"
                defaultOption="Выберите свою профессию..."
                name="profession"
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
                options={professions}
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
                label="Выберите ваши качества"
                options={qualities}
                onChange={handleChange}
                name="qualities"
                defaultValue={data.qualities}
                error={errors.qualities}
              />
              <button
                type="submit"
                className="btn btn-primary w-100 mx-auto"
                disabled={!isValid}
              >
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
