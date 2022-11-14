import React, { FC } from "react";

interface ISearchStatusProps {
  length: number;
}

const SearchStatus: FC<ISearchStatusProps> = ({ length }) => {
  let text: string;
  const count = length % 10;

  if (length === 0) {
    text = "Никто с тобой не тусанет";
  } else {
    if (length > 4 && length < 20) {
      text = `${length} человек тусанет с тобой сегодня`;
    } else if (count > 1 && count < 5) {
      text = `${length} человека тусанут с тобой сегодня`;
    } else {
      text = `${length} человек тусанет с тобой сегодня`;
    }
  }

  return (
    <h2>
      <span className={`badge bg-${length === 0 ? "danger" : "primary"}`}>
        {text}
      </span>
    </h2>
  );
};

export default SearchStatus;
