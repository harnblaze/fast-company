import React, { FC } from "react";
import { onFormFieldChangeCallback } from "../../../types/callbacks";

interface RadioFieldProps {
  options: Array<{ name: string; value: string }>;
  name: string;
  onChange: onFormFieldChangeCallback;
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange({ name: event.target.name, value: event.target.value });
  };

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
              onChange={handleChange}
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
