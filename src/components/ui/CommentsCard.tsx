import React, { FC, useEffect } from "react";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comments/AddCommentForm";
import CommentsList from "../common/comments/CommentsList";
import { dataCommentForm } from "../../types/validatorTypes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment,
} from "../../store/comments";
import { useParams } from "react-router-dom";

const CommentsCard: FC = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams<{ userId: string }>();
  const comments = useAppSelector(getComments());
  const isLoading = useAppSelector(getCommentsLoadingStatus());

  useEffect(() => {
    void dispatch(loadCommentsList(userId));
  }, [userId]);

  const handleSubmit = (data: dataCommentForm): void => {
    void dispatch(createComment({ ...data, pageId: userId }));
  };

  const handleRemoveComment = async (id: string): Promise<void> => {
    await dispatch(removeComment(id));
    await dispatch(loadCommentsList(userId));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        {" "}
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          {!isLoading ? (
            <CommentsList
              comments={sortedComments}
              onRemove={(id) => {
                void handleRemoveComment(id);
              }}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentsCard;
