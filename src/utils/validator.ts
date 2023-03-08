import {
  dataCommentForm,
  dataEditPageState,
  dataLoginState,
  dataRegisterState,
  errorState,
  validatorConfigType,
  validatorFieldConfigType,
} from "../types/validatorTypes";
import { IQuality } from "../api/fake.api/qualities";

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
  license: {
    isRequired: {
      message: "Лицензию необходимо подтвердить",
    },
  },
};

export const validatorConfigEditPage = {
  email: {
    isRequired: {
      message: "Электронная почта обязательна для заполнения",
    },
    isEmail: {
      message: "Электронная почта введена некорректно",
    },
  },
  name: {
    isMinNameSymbol: {
      message: "Имя должен состоять минимум из трех символов",
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

export const validatorConfigCommentForm = {
  userId: {
    isRequired: {
      message: "Выберите от чьего имени вы хотите отправить сообщение",
    },
  },
  content: {
    isRequired: {
      message: "Сообщение не может быть пустым",
    },
  },
};

export const validator = (
  data:
    | dataLoginState
    | dataRegisterState
    | dataEditPageState
    | dataCommentForm,
  config: validatorConfigType
): errorState => {
  const errors: errorState = {
    email: "",
    password: "",
    profession: "",
    qualities: "",
    license: "",
    name: "",
    userId: "",
    content: "",
  };

  function validate(
    method: string,
    data: string | boolean | IQuality[],
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
        if (typeof data === "boolean") {
          statusValidate = !data;
        }
        break;
      case "isEmail":
        regExp = /^\S+@\S+\.\S+/g;
        statusValidate = !regExp.test(data as string);
        break;
      case "isCapitalSymbol":
        regExp = /[A-Z]+/g;
        statusValidate = !regExp.test(data as string);
        break;
      case "isDigitSymbol":
        regExp = /[0-9]+/g;
        statusValidate = !regExp.test(data as string);
        break;
      case "isMinSymbol":
        statusValidate = (data as string).length < 8;
        break;
      case "isMinNameSymbol":
        statusValidate = (data as string).length < 3;
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
