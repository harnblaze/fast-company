import httpService from "./http.service";
import { IComment } from "../api/fake.api/comments";

const endPoint = "comment/";
const commentService = {
  createComment: async (comment: IComment): Promise<any> => {
    const { data } = await httpService.put(endPoint + comment._id, comment);
    return data;
  },
  getComments: async (pageId: string) => {
    const { data } = await httpService.get(endPoint, {
      params: {
        orderBy: `"pageId"`,
        equalTo: `"${pageId}"`,
      },
    });
    return data;
  },
  removeComment: async (commentId: string): Promise<any> => {
    const { data } = await httpService.delete(endPoint + commentId);
    return data;
  },
};

export default commentService;
