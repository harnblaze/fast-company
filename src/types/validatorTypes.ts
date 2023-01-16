import { validatorConfig } from "../utils/validator";
import { IQuality } from "../api/fake.api/qualities";

export interface dataLoginState {
  email: string;
  password: string;
  stayOn: boolean;
}

export interface errorLoginState {
  email: string;
  password: string;
}

export interface dataRegisterState {
  ["email"]: string;
  ["password"]: string;
  ["profession"]: string;
  ["gender"]: string;
  ["qualities"]: IQuality[];
  ["license"]: boolean;
}

export interface errorRegisterState {
  email: string;
  password: string;
  profession: string;
  qualities: string;
  license: string;
}
export type errorState = errorLoginState | errorRegisterState;

export type validatorConfigType = typeof validatorConfig;
export interface validatorFieldConfigType {
  message: string;
}
