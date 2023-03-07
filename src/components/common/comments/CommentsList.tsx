import React, { FC } from "react";
import { IComment } from "../../../api/fake.api/comments";
import Comment from "./Comment";

interface ICommentsListProps {
  comments: IComment[];
}

const CommentsList: FC<ICommentsListProps> = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </>
  );
};

export default CommentsList;
