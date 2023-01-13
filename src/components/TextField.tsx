import React, { FC } from "react";

interface TextFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: FC<TextFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
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
    </div>
  );
};
TextField.defaultProps = {
  type: "text",
};
export default TextField;
