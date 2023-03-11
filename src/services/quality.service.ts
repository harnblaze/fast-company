import httpService from "./http.service";

const endPoint = "quality/";
const qualityService = {
  get: async () => {
    const { data } = await httpService.get(endPoint);
    return data;
  },
};

export default qualityService;
