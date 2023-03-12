import httpService from "./http.service";

const endPoint = "user/";
const userService = {
  get: async () => {
    const { data } = await httpService.get(endPoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      `${endPoint}${payload._id}`,
      payload
    );
    return data;
  },
};

export default userService;
