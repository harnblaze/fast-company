import React, { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { IQuality } from "../api/fake.api/qualities";
import qualityService from "../services/quality.service";

interface UseQualityType {
  qualities: IQuality[];
  isLoading: boolean;
  getQuality: (id: string) => IQuality | undefined;
}

const QualityContext = React.createContext<UseQualityType>({
  qualities: [],
  isLoading: true,
  getQuality: (id) => undefined,
});

export const useQuality = (): UseQualityType => {
  return useContext(QualityContext);
};

interface IQualityProviderProps {
  children: React.ReactNode;
}
const QualityProvider: FC<IQualityProviderProps> = ({ children }) => {
  const [qualities, setQualities] = useState<IQuality[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const errorCatcher = (error: any): void => {
    const { message } = error.response.data;
    setError(message);
  };

  const getQuality = (id: string): IQuality | undefined => {
    return qualities.find((quality) => quality._id === id);
  };

  const getQualityList = async (): Promise<void> => {
    try {
      const { content } = await qualityService.get();
      setQualities(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };
  useEffect(() => {
    void getQualityList();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);
  return (
    <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
      {children}
    </QualityContext.Provider>
  );
};

export default QualityProvider;
