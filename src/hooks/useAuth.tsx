import React, { FC, useContext, useEffect, useState } from "react";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { IAuthResponse, setTokens } from "../services/localStorage.service";

interface IUseAuthType {
  signUp: (data: ISignUpData) => Promise<void>;
  createUser: (data: ICreateUserData) => Promise<void>;
}
interface ISignUpData {
  email: string;
  password: string;
  gender: string;
  license: boolean;
  profession: string;
  qualities: string[];
}

export interface ICreateUserData {
  _id: string;
  gender: string;
  license: boolean;
  profession: string;
  qualities: string[];
}

const httpAuth = axios.create();

const AuthContext = React.createContext<IUseAuthType>({
  signUp: async () => undefined,
  createUser: async () => undefined,
});

export const useAuth = (): IUseAuthType => {
  return useContext(AuthContext);
};

interface IUserProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<IUserProviderProps> = ({ children }) => {
  const [, setCurrentUser] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const errorCatcher = (error: any): void => {
    const { message } = error.response.data;
    setError(message);
  };

  const signUp = async ({
    email,
    password,
    ...rest
  }: ISignUpData): Promise<void> => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
      process.env.REACT_APP_FIREBASE_KEY ?? ""
    }`;
    try {
      const { data } = await httpAuth.post<IAuthResponse>(url, {
        email,
        password,
        returnSecureToken: true,
      });

      setTokens(data);
      await createUser({ _id: data.localId, ...rest });
    } catch (error: any) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          throw Object.assign(new Error(message), {
            email: "Пользователь с таким email уже существует",
            password: "",
            profession: "",
            qualities: "",
            license: "",
          });
        }
      }
    }
  };

  const createUser = async (data: ICreateUserData): Promise<void> => {
    try {
      const { content } = await userService.create(data);
      setCurrentUser(content);
    } catch (error: any) {
      errorCatcher(error);
    }
  };

  return (
    <AuthContext.Provider value={{ signUp, createUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
