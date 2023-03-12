import React, { FC, useContext } from "react";
import axios from "axios";

interface IUseAuthType {
  signUp: (data: IUserAuthData) => Promise<void> | null;
}
interface IUserAuthData {
  email: string;
  password: string;
}

const httpAuth = axios.create();

const AuthContext = React.createContext<IUseAuthType>({
  signUp: async () => undefined,
});

export const useAuth = (): IUseAuthType => {
  return useContext(AuthContext);
};

interface IUserProviderProps {
  children: React.ReactNode;
}
const AuthProvider: FC<IUserProviderProps> = ({ children }) => {
  const signUp = async ({ email, password }: IUserAuthData): Promise<void> => {
    const key = "AIzaSyBH6W1sjEx0OVUKxCaJhN-mmTSFHrQD8iY";
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
    const { data } = await httpAuth.post(url, {
      email,
      password,
      returnSecureToken: true,
    });
    console.log(data);
  };

  return (
    <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
