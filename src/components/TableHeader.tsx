import React, { FC } from "react";
import { ISortType } from "../App";
import { IColumns } from "./UsersTable";

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
    if (selectedSort.iter === name) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc",
      });
    } else if (name !== undefined) {
      onSort({ iter: name, order: "asc" });
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={() => handleSort(columns[column].iter)}
            role={columns[column].iter !== undefined ? "button" : ""}
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
