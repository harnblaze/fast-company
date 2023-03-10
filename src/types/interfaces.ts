import { PropertyName } from "lodash";
import { IUser } from "../hooks/useUsers";
import { ReactNode } from "react";

export interface ISortType {
  path: string;
  order: "asc" | "desc";
}

export interface IColumns {
  [name: PropertyName]: {
    path?: string;
    name?: string;
    component?: ((user: IUser) => ReactNode) | string;
  };
}
