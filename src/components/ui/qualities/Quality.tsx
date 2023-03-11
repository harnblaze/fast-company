import React, { FC } from "react";
import { useQuality } from "../../../hooks/useQuality";

interface IQualityProps {
  id: string;
}

const Quality: FC<IQualityProps> = ({ id }) => {
  const { getQuality } = useQuality();
  const quality = getQuality(id);
  return (
    <span className={`badge m-1 bg-${quality?.color ?? ""}`}>
      {quality?.name}
    </span>
  );
};

export default Quality;
