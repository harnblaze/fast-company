import React, { FC } from "react";
import { IQuality } from "../api/fake.api/user.api";

const Quality: FC<IQuality> = ({ color, name, _id }) => {
  const classes = "badge m-1 bg-" + color;
  return (
    <span key={_id} className={classes}>
      {name}
    </span>
  );
};

export default Quality;
