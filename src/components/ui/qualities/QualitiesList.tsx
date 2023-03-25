import React, { FC } from "react";

import Quality from "./Quality";
import { useAppSelector } from "../../../store/hooks";
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
} from "../../../store/qualities";

interface IQualitiesListProps {
  qualities: string[];
}

const QualitiesList: FC<IQualitiesListProps> = ({ qualities }) => {
  const isLoading = useAppSelector(getQualitiesLoadingStatus());
  if (isLoading) return <>Loading...</>;
  const qualitiesList = useAppSelector(getQualitiesByIds(qualities));

  return (
    <>
      {qualitiesList.map((quality) => (
        <Quality quality={quality} key={quality._id} />
      ))}
    </>
  );
};

export default QualitiesList;
