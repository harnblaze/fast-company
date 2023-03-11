import axios from "axios";
import configFile from "../config";
import { toast } from "react-toastify";

axios.defaults.baseURL = configFile.apiEndpoint;
axios.interceptors.request.use(
  (config) => {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url ?? "");
      const url = containSlash ? config.url?.slice(0, -1) : config.url;
      config.url = `${url ?? ""}.json`;
    }
    return config;
  },
  async (error) => await Promise.reject(error)
);

const transformData = (data: any): unknown[] => {
  return data !== undefined
    ? Object.keys(data).map((el) => ({ ...data[el] }))
    : [];
};

axios.interceptors.response.use(
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
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
