import React, { FC, ReactNode } from "react";

interface ITableProps {
  children: ReactNode;
}

const Table: FC<ITableProps> = ({ children }) => {
  return <table className="table">{children}</table>;
};

export default Table;
