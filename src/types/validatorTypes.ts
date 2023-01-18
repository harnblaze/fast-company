import { validatorConfig, validatorConfigEditPage } from "../utils/validator";
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

export interface IQualitiesData {
  label: string;
  value: string;
  color: string;
}

export interface errorRegisterState {
  email: string;
  password: string;
  profession: string;
  qualities: string;
  license: string;
}
export interface dataEditPageState {
  email: string;
  name: string;
  _id: string;
  sex: string;
  profession: string;
  qualities: IQualitiesData[];
  bookmark: boolean;
  rate: number;
  completedMeetings: number;
}
export interface errorEditPage {
  email: string;
  name: string;
  profession: string;
  qualities: string;
}
export type errorState = errorLoginState | errorRegisterState | errorEditPage;

export type validatorConfigType =
  | typeof validatorConfig
  | typeof validatorConfigEditPage;
export interface validatorFieldConfigType {
  message: string;
}
