import React, { FC, useContext, useEffect, useState } from "react";
import { IComment } from "../api/fake.api/comments";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { dataCommentForm } from "../types/validatorTypes";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";

interface UseCommentsType {
  comments: IComment[];
  isLoading: boolean;
  createComment: (data: any) => Promise<void>;
}

const CommentsContext = React.createContext<UseCommentsType>({
  comments: [],
  isLoading: true,
  createComment: async (data: any) => undefined,
});

export const useComments = (): UseCommentsType => {
  return useContext(CommentsContext);
};

interface ICommentsProviderProps {
  children: React.ReactNode;
}
const CommentsProvider: FC<ICommentsProviderProps> = ({ children }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams<{ userId: string }>();
  const { currentUser } = useAuth();
  useEffect(() => {
    setComments([]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const errorCatcher = (error: any): void => {
    const { message } = error.response.data;
    setError(message);
  };

  const createComment = async (data: dataCommentForm): Promise<void> => {
    const comment = {
      ...data,
      pageId: userId,
      created_at: Date.now().toString(),
      userId: currentUser?._id ?? "",
      _id: nanoid(),
    };
    try {
      const { content } = await commentService.createComment(comment);
      console.log(content);
    } catch (error) {
      errorCatcher(error);
    }
  };

  return (
    <CommentsContext.Provider value={{ comments, createComment, isLoading }}>
      {children}
    </CommentsContext.Provider>
  );
};
export default CommentsProvider;
