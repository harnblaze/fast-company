import React, { FC } from "react";
import { IComment } from "../../../api/fake.api/comments";
import { displayDate } from "../../../utils/displayDate";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

interface ICommentProps {
  comment: IComment;
  onRemove: (id: string) => void;
}

const Comment: FC<ICommentProps> = ({ comment, onRemove }) => {
  const { getUserById } = useUser();
  const { currentUser } = useAuth();
  const user = getUserById(comment.userId);

  const handleClick = (): void => {
    onRemove(comment._id);
  };

  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
              src={user?.image}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {user?.name}{" "}
                    <span className="small">
                      {" "}
                      - {displayDate(comment.created_at)}
                    </span>
                  </p>
                  {user?._id === currentUser?._id ? (
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={handleClick}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <p className="small mb-0">{comment.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
