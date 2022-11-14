import React, { FC } from "react";
import { IUser } from "../api/fake.api/user.api";
import Quality from "./Quality";
import { deleteCallback } from "../App";

interface IUserProps extends IUser {
  handleDelete: deleteCallback;
}

const User: FC<IUserProps> = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  handleDelete,
}) => {
  return (
    <tr key={_id}>
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
