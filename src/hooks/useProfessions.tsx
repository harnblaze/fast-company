import React, { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IProfession } from "../api/fake.api/professions.api";
import professionService from "../services/profession.service";

interface UseProfessionType {
  professions: IProfession[];
  isLoading: boolean;
  getProfession: (id: string) => IProfession | undefined;
}

const ProfessionContext = React.createContext<UseProfessionType>({
  professions: [],
  isLoading: true,
  getProfession: (id) => undefined,
});

export const useProfession = (): UseProfessionType => {
  return useContext(ProfessionContext);
};

interface IProfessionProviderProps {
  children: React.ReactNode;
}
const ProfessionProvider: FC<IProfessionProviderProps> = ({ children }) => {
  const [professions, setProfessions] = useState<IProfession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const errorCatcher = (error: any): void => {
    const { message } = error.response.data;
    setError(message);
  };

  const getProfession = (id: string): IProfession | undefined => {
    return professions.find((prof) => prof._id === id);
  };

  const getProfessionsList = async (): Promise<void> => {
    try {
      const content = await professionService.get();
      setProfessions(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };
  useEffect(() => {
    void getProfessionsList();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <ProfessionContext.Provider
      value={{ isLoading, professions, getProfession }}
    >
      {!isLoading ? children : "Loading"}
    </ProfessionContext.Provider>
  );
};

export default ProfessionProvider;
