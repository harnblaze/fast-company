import React, { FC, ReactNode } from "react";

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

  const renderCaret = (
    selectedSort: ISortType,
    path: string | undefined
  ): ReactNode => {
    if (selectedSort.path === path) {
      if (selectedSort.order === "asc") {
        return <i className="bi bi-caret-down-fill"></i>;
      }
      return <i className="bi bi-caret-up-fill"></i>;
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
            {columns[column].name}{" "}
            {renderCaret(selectedSort, columns[column].path)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
