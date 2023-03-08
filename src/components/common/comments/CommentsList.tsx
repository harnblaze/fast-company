import React, { FC } from "react";
import { IComment } from "../../../api/fake.api/comments";
import Comment from "./Comment";

interface ICommentsListProps {
  comments: IComment[];
  onRemove: (id: string) => void;
}

const CommentsList: FC<ICommentsListProps> = ({ comments, onRemove }) => {
  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} onRemove={onRemove} />
      ))}
    </>
  );
};

export default CommentsList;
