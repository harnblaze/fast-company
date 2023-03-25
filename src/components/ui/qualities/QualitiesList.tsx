import React, { FC, useEffect } from "react";

import Quality from "./Quality";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList,
} from "../../../store/qualities";

interface IQualitiesListProps {
  qualities: string[];
}

const QualitiesList: FC<IQualitiesListProps> = ({ qualities }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getQualitiesLoadingStatus());

  useEffect(() => {
    void dispatch(loadQualitiesList());
  }, []);
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
