import React, { FC, ReactNode } from "react";

import _, { PropertyPath } from "lodash";

import { IUser } from "../api/fake.api/user.api";
import { IColumns } from "../types/interfaces";

interface ITableBodyPops {
  data: IUser[];
  columns: IColumns;
}

const TableBody: FC<ITableBodyPops> = ({ data, columns }) => {
  const renderContent = (item: IUser, column: string): ReactNode => {
    const component = columns[column].component;
    if (component !== undefined) {
      if (typeof component === "function") {
        return component(item);
      } else return component;
    } else {
      const itemPath = columns[column].path as PropertyPath;
      console.log(_.get(item, itemPath));
      return _.get(item, itemPath);
    }
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => (
            <td key={column}>{renderContent(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
