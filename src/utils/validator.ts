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
    const emailRegExp = /^\S+@\S+\.\S+/g;
    switch (method) {
      case "isRequired":
        if (data.trim() === "") {
          return config.message;
        }
        break;
      case "isEmail":
        if (!emailRegExp.test(data)) {
          return config.message;
        }
        break;
    }
    return "";
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName as fieldNameType]) {
      if (errors[fieldName as fieldNameType] === "") {
        errors[fieldName as fieldNameType] = validate(
          validateMethod as validatorType,
          data[fieldName as fieldNameType],

          // @ts-expect-error
          config[fieldName as keyof dataState][validateMethod as validatorType]
        );
      }
    }
  }

  return errors;
};
