export interface ISignUpResponse {
  email?: string;
  expiresIn: string;
  idToken: string;
  kind?: string;
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
  USER_ID = "user_local_id",
}

export const setTokens = ({
  refreshToken,
  expiresIn = "3600",
  idToken,
  localId,
}: ISignUpResponse | ISignInResponse): void => {
  const expiresDate = new Date().getTime() + Number(expiresIn) * 1000;
  localStorage.setItem(JWT_CONST.TOKEN, idToken);
  localStorage.setItem(JWT_CONST.REFRESH_TOKEN, refreshToken);
  localStorage.setItem(JWT_CONST.EXPIRES, expiresDate.toString());
  localStorage.setItem(JWT_CONST.USER_ID, localId);
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
export const getUserID = (): string => {
  return localStorage.getItem(JWT_CONST.USER_ID) ?? "";
};
export const removeAuthData = (): void => {
  localStorage.setItem(JWT_CONST.TOKEN, "");
  localStorage.setItem(JWT_CONST.REFRESH_TOKEN, "");
  localStorage.setItem(JWT_CONST.EXPIRES, "");
  localStorage.setItem(JWT_CONST.USER_ID, "");
};

const localStorageService = {
  setTokens,
  getExpires,
  getAccessToken,
  getRefreshToken,
  getUserID,
  removeAuthData,
};

export default localStorageService;
