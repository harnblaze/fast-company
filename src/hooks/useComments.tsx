import React, { FC, useContext, useEffect, useState } from "react";
import { IComment } from "../api/fake.api/comments";
import { useParams } from "react-router-dom";
import { dataCommentForm } from "../types/validatorTypes";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/hooks";
import { getCurrentUserId } from "../store/users";

interface UseCommentsType {
  comments: IComment[];
  isLoading: boolean;
  createComment: (data: any) => Promise<void>;
  getComments: (pageID: string) => Promise<void>;
  removeComment: (id: string) => Promise<void>;
}

const CommentsContext = React.createContext<UseCommentsType>({
  comments: [],
  isLoading: true,
  createComment: async (data) => undefined,
  getComments: async (data) => undefined,
  removeComment: async (id) => undefined,
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
  const currentUserId = useAppSelector(getCurrentUserId());

  useEffect(() => {
    void getComments();
  }, [userId]);

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
      userId: currentUserId ?? "",
      _id: nanoid(),
    };
    try {
      const { content } = await commentService.createComment(comment);
      setComments((prevState) => [...prevState, content]);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getComments = async (): Promise<void> => {
    try {
      const { content } = await commentService.getComments(userId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setIsLoading(false);
    }
  };
  const removeComment = async (id: string): Promise<void> => {
    try {
      const { content } = await commentService.removeComment(id);
      if (content === null) {
        setComments((prevState) =>
          prevState.filter((comment) => comment._id !== id)
        );
      }
    } catch (e) {
      errorCatcher(e);
    }
  };
  return (
    <CommentsContext.Provider
      value={{ comments, createComment, isLoading, getComments, removeComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
export default CommentsProvider;
