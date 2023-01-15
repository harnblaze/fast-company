import React, { FC } from "react";

interface TextFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  const getInputClasses = (): string => {
    return "form-control" + (error !== "" ? " is-invalid" : "");
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={getInputClasses()}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};
TextField.defaultProps = {
  type: "text",
};
export default TextField;
