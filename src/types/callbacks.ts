import { IProfession } from "../api/fake.api/professions.api";
import { IQuality } from "../api/fake.api/qualities";

export type deleteCallback = (id: string) => void;
export type toggleFavoriteCallback = (id: string) => void;
export type changePageCallback = (index: number) => void;
export type onItemsSelectCallback = (item: IProfession) => void;
export interface onFormFieldChangeCallbackArgs {
  name: string;
  value: string | IQuality[] | boolean;
}
export type onFormFieldChangeCallback = (
  arg: onFormFieldChangeCallbackArgs
) => void;
