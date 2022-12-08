import React, { FC } from "react";

import { toggleFavoriteCallback } from "../types/callbacks";

interface IBookmarkProps {
  _id: string;
  isBookmark: boolean;
  handleToggleFavorite: toggleFavoriteCallback;
}

const Bookmark: FC<IBookmarkProps> = ({
  isBookmark,
  _id,
  handleToggleFavorite,
}) => {
  return (
    <button
      className="btn btn-outline-secondary btn-sm"
      onClick={() => handleToggleFavorite(_id)}
    >
      <i className={"bi bi-bookmark" + (isBookmark ? "-fill" : "")}></i>
    </button>
  );
};

export default Bookmark;
