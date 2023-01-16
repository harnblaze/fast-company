import {
  dataLoginState,
  dataRegisterState,
  errorState,
  validatorConfigType,
  validatorFieldConfigType,
} from "../types/validatorTypes";

export const validatorConfig = {
  email: {
    isRequired: {
      message: "Электронная почта обязательна для заполнения",
    },
    isEmail: {
      message: "Электронная почта введена некорректно",
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
  profession: {
    isRequired: {
      message: "Профессия должна быть выбрана",
    },
  },
  qualities: {
    isRequired: {
      message: "Хотя бы одно качество должно быть выбрано",
    },
  },
};

export const validator = (
  data: dataLoginState | dataRegisterState,
  config: validatorConfigType
): errorState => {
  const errors: errorState = {
    email: "",
    password: "",
    profession: "",
    qualities: "",
  };

  function validate(
    method: string,
    data: string,
    config: validatorFieldConfigType
  ): string {
    let regExp = /^\S+@\S+\.\S+/g;
    let statusValidate = false;
    switch (method) {
      case "isRequired":
        if (Array.isArray(data)) {
          statusValidate = data.length === 0;
        }
        if (typeof data === "string") {
          statusValidate = data.trim() === "";
        }
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
      // @ts-expect-error

      if (errors[fieldName] === "") {
        // @ts-expect-error

        errors[fieldName] = validate(
          validateMethod,
          // @ts-expect-error
          data[fieldName],
          // @ts-expect-error
          config[fieldName][validateMethod]
        );
      }
    }
  }

  return errors;
};
