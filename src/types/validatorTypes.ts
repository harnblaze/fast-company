import { validatorConfig } from "../utils/validator";
import { IQuality } from "../api/fake.api/qualities";

export interface dataLoginState {
  email: string;
  password: string;
}

export interface dataRegisterState {
  ["email"]: string;
  ["password"]: string;
  ["profession"]: string;
  ["gender"]: string;
  ["qualities"]: IQuality[];
}

export interface errorState {
  email: string;
  password: string;
  profession: string;
  qualities: string;
}

export type validatorConfigType = typeof validatorConfig;
export interface validatorFieldConfigType {
  message: string;
}
