import React, { FC, useContext } from "react";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  sex: string;
  profession: string;
  qualities: string[];
  completedMeetings: number;
  rate: number;
  bookmark: boolean;
}

interface UseAuthType {
  users: IUser[] | [];
}

const AuthContext = React.createContext<UseAuthType>({ users: [] });

export const useAuth = (): UseAuthType => {
  return useContext(AuthContext);
};

interface IUserProviderProps {
  children: React.ReactNode;
}
const AuthProvider: FC<IUserProviderProps> = ({ children }) => {
  return (
    <AuthContext.Provider value={{ users: [] }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
