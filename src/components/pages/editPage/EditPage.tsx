import React, { FC, useEffect, useState } from "react";
import { IQuality } from "../../../api/fake.api/qualities";
import { onFormFieldChangeCallback } from "../../../types/callbacks";
import TextField from "../../common/form/TextField";
import SelectField from "../../common/form/SelectField";
import RadioField from "../../common/form/RadioField";
import MultiSelectField from "../../common/form/MultiSelectField";
import { validator, validatorConfigEditPage } from "../../../utils/validator";
import {
  dataEditPageState,
  errorEditPage,
  IQualitiesData,
} from "../../../types/validatorTypes";
import BackHistoryButton from "../../common/BackButton";
import { useAuth } from "../../../hooks/useAuth";
import { useProfession } from "../../../hooks/useProfessions";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import {
  getQualities,
  getQualitiesLoadingStatus,
} from "../../../store/qualities";

interface EditPageProps {
  id: string;
}

const EditPage: FC<EditPageProps> = ({ id }) => {
  const history = useHistory();
  const { currentUser, updateUser } = useAuth();
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
  const [isLoading, setIsLoading] = useState(true);
  const { professions, isLoading: isProfessionLoading } = useProfession();
  const qualities = useAppSelector(getQualities());
  const isQualityLoading = useAppSelector(getQualitiesLoadingStatus());
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    profession: "",
    qualities: "",
  });

  const transformQualities = (data: string[]): IQualitiesData[] => {
    return getQualitiesListByIds(data).map((quality) => ({
      label: quality.name,
      value: quality._id,
      color: quality.color,
    }));
  };

  const getQualitiesListByIds = (qualitiesIds: string[]): IQuality[] => {
    const qualitiesArray = [];
    for (const qualitiesId of qualitiesIds) {
      for (const quality of qualities) {
        if (qualitiesId === quality._id) {
          qualitiesArray.push(quality);
          break;
        }
      }
    }
    return qualitiesArray;
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    await updateUser({
      ...data,
      qualities: data.qualities.map((q) => q.value),
    }).finally(() => {
      history.push(`/users/${currentUser?._id ?? ""}`);
    });
  };

  const validate = (): boolean => {
    const errors = validator(data, validatorConfigEditPage);
    setErrors(errors as errorEditPage);
    return Object.values(errors).every((el) => el === "");
  };

  const handleChange: onFormFieldChangeCallback = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  useEffect(() => {
    if (
      !isProfessionLoading &&
      !isQualityLoading &&
      currentUser !== undefined
    ) {
      setData({
        ...currentUser,
        qualities: transformQualities(currentUser.qualities),
      });
    }
  }, [isProfessionLoading, isQualityLoading, currentUser]);
  useEffect(() => {
    if (data._id !== "" && isLoading) setIsLoading(false);
    validate();
  }, [data, professions]);

  const isValid = Object.values(errors).every((el) => el === "");
  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-lg-6  col-md-6 col-sm-10 mx-auto p-4 shadow">
          {isLoading ? (
            "Loading...."
          ) : (
            <form
              onSubmit={(e) => {
                void handleSubmit(e);
              }}
            >
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
                options={transformQualities(qualities.map((q) => q._id))}
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
