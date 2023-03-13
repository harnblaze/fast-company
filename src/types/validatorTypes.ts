import {
  validatorConfig,
  validatorConfigCommentForm,
  validatorConfigEditPage,
} from "../utils/validator";

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
  ["name"]: string;
  ["email"]: string;
  ["password"]: string;
  ["profession"]: string;
  ["gender"]: string;
  ["qualities"]: Array<{ label: string; value: string }>;
  ["license"]: boolean;
}

export interface IQualitiesData {
  label: string;
  value: string;
  color: string;
}

export interface errorRegisterState {
  name: string;
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

export interface dataCommentForm {
  userId: string;
  content: string;
}

export interface errorCommentForm {
  userId: string;
  content: string;
}

export type errorState =
  | errorLoginState
  | errorRegisterState
  | errorEditPage
  | errorCommentForm;

export type validatorConfigType =
  | typeof validatorConfig
  | typeof validatorConfigEditPage
  | typeof validatorConfigCommentForm;
export interface validatorFieldConfigType {
  message: string;
}
