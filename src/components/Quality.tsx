import React, { FC } from "react";

import { IQuality } from "../api/fake.api/user.api";

const Quality: FC<IQuality> = ({ color, name }) => {
  return <span className={"badge m-1 bg-" + color}>{name}</span>;
};

export default Quality;
