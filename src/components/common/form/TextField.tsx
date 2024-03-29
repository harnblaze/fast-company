import React, { FC, useState } from "react";
import { onFormFieldChangeCallback } from "../../../types/callbacks";

interface TextFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: onFormFieldChangeCallback;
  error?: string;
}

const TextField: FC<TextFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const getInputClasses = (): string => {
    return "form-control" + (error !== "" ? " is-invalid" : "");
  };
  const toggleShowPassword = (): void => {
    setShowPassword((prevState) => !prevState);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange({ name: event.target.name, value: event.target.value });
  };
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="input-group has-validation">
        <input
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )}

        <div className="invalid-feedback">{error}</div>
      </div>
    </div>
  );
};
TextField.defaultProps = {
  type: "text",
};
export default TextField;
