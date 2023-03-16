import React, { FC, useContext, useEffect, useState } from "react";

import userService from "../services/user.service";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  sex: string;
  image: string;
  profession: string;
  qualities: string[];
  completedMeetings: number;
  rate: number;
  bookmark: boolean;
}

interface UseUserType {
  users: IUser[];
  getUserById: (id: string) => IUser | undefined;
}

const UserContext = React.createContext<UseUserType>({
  users: [],
  getUserById: () => undefined,
});

export const useUser = (): UseUserType => {
  return useContext(UserContext);
};

interface IUserProviderProps {
  children: React.ReactNode;
}
const UserProvider: FC<IUserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { currentUser } = useAuth();
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

  const getUserById = (id: string): IUser | undefined => {
    return users.find((user) => user._id === id);
  };

  useEffect(() => {
    void getUsers();
  }, [currentUser]);
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {!isLoading ? children : "Loading"}
    </UserContext.Provider>
  );
};

export default UserProvider;
