import { validatorConfig } from "../utils/validator";

export interface dataState {
  [fieldName: string]: string;
}

export type validatorConfigType = typeof validatorConfig;
export interface validatorFieldConfigType {
  message: string;
}
