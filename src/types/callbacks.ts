import { IProfession } from "../api/fake.api/professions.api";

export type deleteCallback = (id: string) => void;
export type toggleFavoriteCallback = (id: string) => void;
export type changePageCallback = (index: number) => void;
export type onItemsSelectCallback = (item: IProfession) => void;
