import httpService from "./http.service";

const endPoint = "user/";
const userService = {
  get: async () => {
    const { data } = await httpService.get(endPoint);
    return data;
  },
};

export default userService;
