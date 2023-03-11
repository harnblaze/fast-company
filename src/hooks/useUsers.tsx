import React, { FC, useContext, useEffect, useState } from "react";

import userService from "../services/user.service";
import { toast } from "react-toastify";

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

interface UseUserType {
  users: IUser[];
}

const UserContext = React.createContext<UseUserType>({ users: [] });

export const useUser = (): UseUserType => {
  return useContext(UserContext);
};

interface IUserProviderProps {
  children: React.ReactNode;
}
const UserProvider: FC<IUserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const errorCatcher = (error: any): void => {
    const { message } = error.response.data;
    setError(message);
  };

  const getUsers = async (): Promise<void> => {
    try {
      const { content } = await userService.get();
      setUsers(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };
  useEffect(() => {
    void getUsers();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <UserContext.Provider value={{ users }}>
      {!isLoading ? children : "Loading"}
    </UserContext.Provider>
  );
};

export default UserProvider;
