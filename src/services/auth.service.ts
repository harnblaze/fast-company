import axios from "axios";
import { ISignUpData } from "../hooks/useAuth";
import { ISignUpResponse } from "./localStorage.service";

const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const authService = {
  register: async ({ email, password }: ISignUpData) => {
    const url = `accounts:signUp`;
    const { data } = await httpAuth.post<ISignUpResponse>(url, {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
};

export default authService;
