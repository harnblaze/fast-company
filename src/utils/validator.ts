import {
  dataState,
  validatorConfigType,
  validatorFieldConfigType,
} from "../types/validatorTypes";

export const validatorConfig = {
  email: {
    isRequired: {
      message: "Электронная почта обязательна для заполнения",
    },
    isEmail: {
      message: "Электронная почта введена некоректно",
    },
  },
  password: {
    isRequired: {
      message: "Пароль обязателен для заполнения",
    },
    isCapitalSymbol: {
      message: "Пароль должен содержать хотя бы одну заглавную букву",
    },
    isDigitSymbol: {
      message: "Пароль должен содержать хотя бы одну цифру",
    },
    isMinSymbol: {
      message: "Пароль должен состоять из 8ми символов",
    },
  },
};

export const validator = (
  data: dataState,
  config: validatorConfigType
): dataState => {
  const errors: dataState = { email: "", password: "" };

  function validate(
    method: string,
    data: string,
    config: validatorFieldConfigType
  ): string {
    let regExp = /^\S+@\S+\.\S+/g;
    let statusValidate = false;
    switch (method) {
      case "isRequired":
        statusValidate = data.trim() === "";
        break;
      case "isEmail":
        regExp = /^\S+@\S+\.\S+/g;
        statusValidate = !regExp.test(data);
        break;
      case "isCapitalSymbol":
        regExp = /[A-Z]+/g;
        statusValidate = !regExp.test(data);
        break;
      case "isDigitSymbol":
        regExp = /[0-9]+/g;
        statusValidate = !regExp.test(data);
        break;
      case "isMinSymbol":
        statusValidate = data.length < 8;
        break;
    }
    return statusValidate ? config.message : "";
  }

  for (const fieldName in data) {
    // @ts-expect-error
    for (const validateMethod in config[fieldName]) {
      if (errors[fieldName] === "") {
        errors[fieldName] = validate(
          validateMethod,
          data[fieldName],
          // @ts-expect-error
          config[fieldName][validateMethod]
        );
      }
    }
  }

  return errors;
};
