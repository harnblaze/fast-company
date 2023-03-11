import React, { FC } from "react";

import Quality from "./Quality";
import { useQuality } from "../../../hooks/useQuality";

interface IQualitiesListProps {
  qualities: string[];
}

const QualitiesList: FC<IQualitiesListProps> = ({ qualities }) => {
  const { isLoading } = useQuality();
  if (isLoading) return <>Loading...</>;
  return (
    <>
      {qualities.map((quality) => (
        <Quality id={quality} key={quality} />
      ))}
    </>
  );
};

export default QualitiesList;
