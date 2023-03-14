import httpService from "./http.service";
import { IComment } from "../api/fake.api/comments";

const endPoint = "comment/";
const commentService = {
  createComment: async (comment: IComment): Promise<any> => {
    const { data } = await httpService.put(endPoint + comment._id, comment);
    return data;
  },
};

export default commentService;
