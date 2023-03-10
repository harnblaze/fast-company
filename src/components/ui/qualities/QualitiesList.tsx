import React, { FC } from "react";

import Quality from "./Quality";
import { IQuality } from "../../../api/fake.api/qualities";

interface IQualitiesListProps {
  qualities: IQuality[];
}

const QualitiesList: FC<IQualitiesListProps> = ({ qualities }) => {
  return (
    <>
      {qualities.map((quality, id) => (
        <Quality {...quality} key={`${quality._id}_${id}`} />
      ))}
    </>
  );
};

export default QualitiesList;
