export interface ISignUpResponse {
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
}

export interface ISignInResponse {
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}

enum JWT_CONST {
  TOKEN = "jwt_token",
  REFRESH_TOKEN = "jwt_refresh_token",
  EXPIRES = "jwt_expires",
}

export const setTokens = ({
  refreshToken,
  expiresIn = "3600",
  idToken,
}: ISignUpResponse | ISignInResponse): void => {
  const expiresDate = new Date().getTime() + Number(expiresIn) * 1000;
  localStorage.setItem(JWT_CONST.TOKEN, idToken);
  localStorage.setItem(JWT_CONST.REFRESH_TOKEN, refreshToken);
  localStorage.setItem(JWT_CONST.EXPIRES, expiresDate.toString());
};

export const getAccessToken = (): string => {
  return localStorage.getItem(JWT_CONST.TOKEN) ?? "";
};
export const getRefreshToken = (): string => {
  return localStorage.getItem(JWT_CONST.REFRESH_TOKEN) ?? "";
};
export const getExpires = (): string => {
  return localStorage.getItem(JWT_CONST.EXPIRES) ?? "";
};

const localStorageService = {
  setTokens,
  getExpires,
  getAccessToken,
  getRefreshToken,
};

export default localStorageService;
