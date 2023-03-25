import React, { FC } from "react";
import { IQuality } from "../../../api/fake.api/qualities";

interface IQualityProps {
  quality: IQuality;
}

const Quality: FC<IQualityProps> = ({ quality }) => {
  return (
    <span className={`badge m-1 bg-${quality?.color ?? ""}`}>
      {quality?.name}
    </span>
  );
};

export default Quality;
