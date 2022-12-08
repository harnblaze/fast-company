import React, { FC } from "react";

import { IColumns, ISortType } from "../types/interfaces";

interface ITableHeaderProps {
  selectedSort: ISortType;
  onSort: (name: ISortType) => void;
  columns: IColumns;
}

const TableHeader: FC<ITableHeaderProps> = ({
  onSort,
  selectedSort,
  columns,
}) => {
  const handleSort = (name: string | undefined): void => {
    if (selectedSort.path === name) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc",
      });
    } else if (name !== undefined) {
      onSort({ path: name, order: "asc" });
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={() => handleSort(columns[column].path)}
            role={columns[column].path !== undefined ? "button" : ""}
            scope="col"
          >
            {columns[column].name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
