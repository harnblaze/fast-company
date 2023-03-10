import React, { FC } from "react";
import { useProfession } from "../../hooks/useProfessions";

interface IProfessionProps {
  id: string;
}

const Profession: FC<IProfessionProps> = ({ id }) => {
  const { isLoading, getProfession } = useProfession();
  const prof = getProfession(id);
  if (isLoading) return <>Loading...</>;
  return <p>{prof?.name}</p>;
};

export default Profession;
