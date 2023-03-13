import axios from "axios";
import configFile from "../config";
import { toast } from "react-toastify";
import localStorageService from "./localStorage.service";
import { httpAuth } from "../hooks/useAuth";

const http = axios.create({
  baseURL: configFile.apiEndpoint,
});

http.interceptors.request.use(
  async (config) => {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url ?? "");
      const url = containSlash ? config.url?.slice(0, -1) : config.url;
      config.url = `${url ?? ""}.json`;
      const expiresDate = localStorageService.getExpires();
      const refreshToken = localStorageService.getRefreshToken();
      if (refreshToken !== "" && Number(expiresDate) < Date.now()) {
        const { data } = await httpAuth.post<{
          refresh_token: string;
          expires_in: string;
          id_token: string;
          user_id: string;
        }>("token", {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        });
        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          expiresIn: data.expires_in,
          idToken: data.id_token,
          localId: data.user_id,
        });
      }
      const accessToken = localStorageService.getAccessToken();
      if (accessToken !== undefined) {
        config.params = { ...config.params, auth: accessToken };
      }
    }
    return config;
  },
  async (error) => await Promise.reject(error)
);

const transformData = (data: any): unknown[] => {
  return data !== undefined && data._id === undefined
    ? Object.keys(data).map((el) => ({ ...data[el] }))
    : data;
};

http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: transformData(res.data) };
    }
    return res;
  },
  async (error) => {
    const expectedErrors =
      error.response !== undefined &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedErrors) {
      console.log(error);
      toast.error("Something was wrong. Try it later");
    }
    return await Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
};

export default httpService;
