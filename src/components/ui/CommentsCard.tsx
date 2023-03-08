import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IComment } from "../../api/fake.api/comments";
import api from "../../api";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comments/AddCommentForm";
import CommentsList from "../common/comments/CommentsList";
import { dataCommentForm } from "../../types/validatorTypes";

const CommentsCard: FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    api.comments
      .fetchCommentsForUser(userId)
      .then((data) => setComments(data))
      .catch((e) => console.log(e));
  }, []);

  const handleSubmit = (data: dataCommentForm): void => {
    void api.comments
      .add({ ...data, pageId: userId })
      .then((data) => setComments([...comments, { ...data, pageId: userId }]))
      .catch((e) => console.log(e));
  };
  const handleRemoveComment = (id: string): void => {
    void api.comments
      .remove(id)
      .then((id) => {
        setComments(comments.filter((x) => x._id !== id));
      })
      .catch((e) => console.log(e));
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
          <CommentsList
            comments={sortedComments}
            onRemove={handleRemoveComment}
          />
        </div>
      </div>
    </>
  );
};

export default CommentsCard;
