import httpService from "./http.service";

const endPoint = "profession/";
const professionService = {
  get: async () => {
    const { data } = await httpService.get(endPoint);
    return data;
  },
};

export default professionService;
