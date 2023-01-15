import React, { FC } from "react";
import { dataState } from "../../../types/validatorTypes";

interface RadioFieldProps {
  options: dataState[];
  name: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  value: string;
  label: string;
}
const RadioField: FC<RadioFieldProps> = ({
  options,
  name,
  onChange,
  value,
  label,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <div>
        {options.map((option) => (
          <div
            key={option.name + "_" + option.value}
            className="form-check form-check-inline"
          >
            <input
              className="form-check-input"
              type="radio"
              name={name}
              checked={option.value === value}
              id={option.name + "_" + option.value}
              value={option.value}
              onChange={onChange}
            />
            <label
              className="form-check-label"
              htmlFor={option.name + "_" + option.value}
            >
              {option.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioField;
