import React, { FC } from "react";
import { useAppSelector } from "../../store/hooks";
import {
  getProfessionById,
  getProfessionsLoadingStatus,
} from "../../store/professions";

interface IProfessionProps {
  id: string;
}

const Profession: FC<IProfessionProps> = ({ id }) => {
  const profession = useAppSelector(getProfessionById(id));
  const isLoading = useAppSelector(getProfessionsLoadingStatus());
  if (isLoading) return <>Loading...</>;
  return <p>{profession?.name}</p>;
};

export default Profession;
