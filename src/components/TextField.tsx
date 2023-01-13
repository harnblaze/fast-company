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
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      <p>{error}</p>
    </div>
  );
};
TextField.defaultProps = {
  type: "text",
};
export default TextField;
