import {
  dataState,
  fieldNameType,
  validatorConfigType,
  validatorFieldConfigType,
  validatorType,
} from "../layouts/Login";

export const validator = (
  data: dataState,
  config: validatorConfigType
): dataState => {
  const errors: dataState = { email: "", password: "" };

  function validate(
    method: validatorType,
    data: string,
    config: validatorFieldConfigType
  ): string {
    switch (method) {
      case "isRequired":
        if (data.trim() === "") {
          return config.message;
        }
        break;
    }
    return "";
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName as fieldNameType]) {
      errors[fieldName as fieldNameType] = validate(
        validateMethod as validatorType,
        data[fieldName as fieldNameType],
        config[fieldName as keyof dataState][validateMethod as validatorType]
      );
    }
  }

  return errors;
};
