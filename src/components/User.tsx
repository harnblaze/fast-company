import React, { FC } from "react";
import { IUser } from "../api/fake.api/user.api";
import Quality from "./Quality";
import { deleteCallback, toggleFavoriteCallback } from "../App";
import Bookmark from "./Bookmark";

interface IUserProps extends IUser {
  handleDelete: deleteCallback;
  handleToggleFavorite: toggleFavoriteCallback;
}

const User: FC<IUserProps> = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  handleDelete,
  handleToggleFavorite,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Quality {...quality} key={quality._id} />
        ))}
      </td>

      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        <Bookmark
          isBookmark={bookmark}
          _id={_id}
          handleToggleFavorite={handleToggleFavorite}
        />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
