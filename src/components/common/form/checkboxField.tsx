import React, { FC } from "react";
import { onFormFieldChangeCallback } from "../../../types/callbacks";

interface CheckboxFieldProps {
  name: string;
  value: boolean;
  onChange: onFormFieldChangeCallback;
  children: React.ReactNode;
  error?: string;
}

const CheckboxField: FC<CheckboxFieldProps> = ({
  name,
  value,
  onChange,
  children,
  error,
}) => {
  const getCheckBoxClasses = (): string =>
    `form-check-label ${error !== "" ? "is-invalid" : ""}`;

  const handleChange = (): void => {
    onChange({ name, value: !value });
  };

  return (
    <div className="form-check mb-4">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={name}
        checked={value}
        onChange={handleChange}
      />
      <label className={getCheckBoxClasses()} htmlFor={name}>
        {children}
      </label>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default CheckboxField;
