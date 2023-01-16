import React from "react";
import Select from "react-select";
import { IQualities } from "../../../api/fake.api/qualities";
import { onFormFieldChangeCallback } from "../../../types/callbacks";

interface MultiSelectFieldProps {
  label: string;
  name: string;
  options: IQualities;
  onChange: onFormFieldChangeCallback;
  error: string;
  defaultValue: any;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  label,
  options,
  name,
  onChange,
  error,
  defaultValue,
}) => {
  const getMultiSelectClasses = (): string =>
    `basic-multi-select ${error !== "" ? "is-invalid" : ""}`;

  const handleChange = (value: any): void => {
    onChange({ name, value });
  };

  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id,
        }))
      : options;

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        defaultValue={defaultValue}
        closeMenuOnSelect={false}
        options={optionsArray}
        className={getMultiSelectClasses()}
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
      />
      {error !== "" && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default MultiSelectField;
