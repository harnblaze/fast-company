export const generateAuthError = (message: string): string => {
  switch (message) {
    case "EMAIL_NOT_FOUND":
      return "Email или пароль не верный";
    case "INVALID_PASSWORD":
      return "Email или пароль не верный";
    case "USER_DISABLED":
      return "Учетная запись пользователя отключена администратором";
    case "EMAIL_EXISTS":
      return "Пользователь с таким email уже существует";
    default:
      return "Слишком много попыток входа. Попробуйте позднее";
  }
};
