import { PropertyName } from "lodash";
import { IUser } from "../api/fake.api/user.api";
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
