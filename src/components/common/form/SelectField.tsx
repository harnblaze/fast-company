import React, { FC } from "react";
import { onFormFieldChangeCallback } from "../../../types/callbacks";
import { IProfession } from "../../../api/fake.api/professions.api";
import { IUser } from "../../../api/fake.api/user.api";

interface selectFieldProps {
  label?: string;
  value: string;
  name: string;
  onChange: onFormFieldChangeCallback;
  defaultOption: string;
  options: IProfession[] | IUser[];
  error?: string;
}

const SelectField: FC<selectFieldProps> = ({
  label,
  value,
  name,
  onChange,
  defaultOption,
  options,
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
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default SelectField;
