import httpService from "./http.service";
import { ICreateUserData } from "../hooks/useAuth";
import localStorageService from "./localStorage.service";

const endPoint = "user/";
const userService = {
  get: async () => {
    const { data } = await httpService.get(endPoint);
    return data;
  },
  create: async (payload: ICreateUserData) => {
    const { data } = await httpService.put(
      `${endPoint}${payload._id}`,
      payload
    );
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      endPoint + localStorageService.getUserID()
    );
    return data;
  },
};

export default userService;
