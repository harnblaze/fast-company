import React, { FC, useEffect } from "react";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comments/AddCommentForm";
import CommentsList from "../common/comments/CommentsList";
import { dataCommentForm } from "../../types/validatorTypes";
import { useComments } from "../../hooks/useComments";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
} from "../../store/comments";
import { useParams } from "react-router-dom";

const CommentsCard: FC = () => {
  const { createComment, removeComment } = useComments();
  const dispatch = useAppDispatch();
  const { userId } = useParams<{ userId: string }>();
  const comments = useAppSelector(getComments());
  const isLoading = useAppSelector(getCommentsLoadingStatus());

  useEffect(() => {
    void dispatch(loadCommentsList(userId));
  }, [userId]);

  const handleSubmit = (data: dataCommentForm): void => {
    // void api.comments
    //   .add({ ...data, pageId: userId })
    //   .then((data) => setComments([...comments, { ...data, pageId: userId }]))
    //   .catch((e) => console.log(e));
    void createComment(data);
  };
  const handleRemoveComment = (id: string): void => {
    // void api.comments
    //   .remove(id)
    //   .then((id) => {
    //     setComments(comments.filter((x) => x._id !== id));
    //   })
    //   .catch((e) => console.log(e));
    void removeComment(id);
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
              onRemove={handleRemoveComment}
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
