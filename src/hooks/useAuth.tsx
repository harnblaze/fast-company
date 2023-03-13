import React, { FC, useContext, useEffect, useState } from "react";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, {
  ISignInResponse,
  ISignUpResponse,
  setTokens,
} from "../services/localStorage.service";
import { IUser } from "./useUsers";

interface IUseAuthType {
  signUp: (data: ISignUpData) => Promise<void>;
  createUser: (data: ICreateUserData) => Promise<void>;
  signIn: (data: ISignInData) => Promise<void>;
  currentUser: IUser | undefined;
}
interface ISignUpData {
  email: string;
  password: string;
  gender: string;
  license: boolean;
  profession: string;
  qualities: string[];
}

interface ISignInData {
  email: string;
  password: string;
  stayOn: boolean;
}

export interface ICreateUserData {
  _id: string;
  gender: string;
  license: boolean;
  profession: string;
  qualities: string[];
  rate: number;
  completedMeetings: number;
}

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const AuthContext = React.createContext<IUseAuthType>({
  signUp: async () => undefined,
  createUser: async () => undefined,
  signIn: async () => undefined,
  currentUser: undefined,
});

export const useAuth = (): IUseAuthType => {
  return useContext(AuthContext);
};

interface IUserProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<IUserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorageService.getAccessToken() !== undefined) {
      void getUserData();
    } else {
      setIsLoading(false);
    }
  }, []);
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
  const getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const getUserData = async (): Promise<void> => {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async ({
    email,
    password,
    ...rest
  }: ISignUpData): Promise<void> => {
    const url = `accounts:signUp`;
    try {
      const { data } = await httpAuth.post<ISignUpResponse>(url, {
        email,
        password,
        returnSecureToken: true,
      });

      setTokens(data);
      await createUser({
        _id: data.localId,
        rate: getRandomInt(1, 10),
        completedMeetings: getRandomInt(0, 200),
        ...rest,
      });
    } catch (error: any) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
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

  const signIn = async ({ email, password }: ISignInData): Promise<void> => {
    const url = `accounts:signInWithPassword`;
    try {
      const { data } = await httpAuth.post<ISignInResponse>(url, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await getUserData();
    } catch (error: any) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_NOT_FOUND") {
          throw Object.assign(new Error(message), {
            email: "Email или пароль не верный",
            password: "Email или пароль не верный",
          });
        }
        if (message === "INVALID_PASSWORD") {
          throw Object.assign(new Error(message), {
            email: "Email или пароль не верный",
            password: "Email или пароль не верный",
          });
        }
        if (message === "USER_DISABLED") {
          throw Object.assign(new Error(message), {
            email: "Учетная запись пользователя отключена администратором.",
            password: "",
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
    <AuthContext.Provider value={{ signUp, createUser, signIn, currentUser }}>
      {isLoading !== undefined ? children : "Loading..."}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
