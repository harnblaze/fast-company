import React, { FC } from "react";
import { IProfession } from "../../../api/fake.api/professions.api";
import { onFormFieldChangeCallback } from "../../../types/callbacks";

interface selectFieldProps {
  label: string;
  value: string;
  name: string;
  onChange: onFormFieldChangeCallback;
  defaultOption: string;
  professions: IProfession[];
  error?: string;
}

const SelectField: FC<selectFieldProps> = ({
  label,
  value,
  name,
  onChange,
  defaultOption,
  professions,
  error,
}) => {
  const getSelectClasses = (): string => {
    return "form-select" + (error !== "" ? " is-invalid" : "");
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange({ name: event.target.name, value: event.target.value });
  };
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getSelectClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {professions.map((profession) => (
          <option key={profession._id} value={profession._id}>
            {profession.name}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default SelectField;