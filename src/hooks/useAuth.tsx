import React, { FC, useContext, useEffect, useState } from "react";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

interface IUseAuthType {
  signUp: (data: IUserAuthData) => Promise<void>;
  createUser: (data: IUserAuthData) => Promise<void>;
}
interface IUserAuthData {
  email: string;
  password: string;
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
  const [currentUser, setCurrentUser] = useState();
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
  }: IUserAuthData): Promise<void> => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
      process.env.REACT_APP_FIREBASE_KEY ?? ""
    }`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await createUser({ _id: data.localId, ...rest });
      console.log(data);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const createUser = async (data): Promise<void> => {
    try {
      const { content } = await userService.create(data);
      setCurrentUser(content);
      console.log(data);
    } catch (error) {
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
