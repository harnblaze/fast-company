import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IComment } from "../../api/fake.api/comments";
import api from "../../api";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comments/AddCommentForm";
import CommentsList from "../common/comments/CommentsList";

const CommentsCard: FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [comments, setComments] = useState<IComment[]>();

  useEffect(() => {
    api.comments
      .fetchCommentsForUser(userId)
      .then((data) => setComments(data))
      .catch((e) => console.log(e));
  }, []);

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        {" "}
        <div className="card-body ">
          <AddCommentForm />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          <CommentsList comments={sortedComments} />
        </div>
      </div>
    </>
  );
};

export default CommentsCard;
