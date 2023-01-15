import React, { FC } from "react";

import Quality from "./Quality";
import { IQuality } from "../../../api/fake.api/user.api";

interface IQualitiesListProps {
  qualities: IQuality[];
}

const QualitiesList: FC<IQualitiesListProps> = ({ qualities }) => {
  return (
    <>
      {qualities.map((quality) => (
        <Quality {...quality} key={quality._id} />
      ))}
    </>
  );
};

export default QualitiesList;
