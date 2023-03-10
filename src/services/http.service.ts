import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";

axios.defaults.baseURL = config.apiEndpoint;
axios.interceptors.response.use(
  (res) => res,
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
