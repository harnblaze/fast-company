import React, { FC } from "react";

import { onFormFieldChangeCallback } from "../../../types/callbacks";

interface ITextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: onFormFieldChangeCallback;
  error?: string;
  rows?: number;
}

const TextAreaField: FC<ITextAreaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  rows,
}) => {
  const getInputClasses = (): string => {
    return "form-control" + (error !== "" ? " is-invalid" : "");
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    onChange({ name: event.target.name, value: event.target.value });
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="input-group has-validation">
        <textarea
          rows={rows != null ? rows : 3}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
        />
        <div className="invalid-feedback">{error}</div>
      </div>
    </div>
  );
};

export default TextAreaField;
