import { useEffect, useState } from "react";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import httpService from "../services/http.service";

interface IUseMockData {
  error: string | null;
  initialize: () => Promise<void>;
  status: string;
  progress: number;
}

const useMockData = (): IUseMockData => {
  const statusConst = {
    idle: "Not Started",
    pending: "In Process",
    success: "Ready",
    error: "Error Occurred",
  };
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(statusConst.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);

  const incrementCount = (): void => {
    setCount((prevState) => prevState + 1);
  };

  const updateProgress = (): void => {
    if (count !== 0 && status === statusConst.idle) {
      setStatus(statusConst.pending);
    }
    const newProgress = Math.floor((count / summaryCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatus(statusConst.success);
    }
  };

  const summaryCount = professions.length + qualities.length + users.length;

  useEffect(() => {
    updateProgress();
  }, [count]);

  const initialize = async (): Promise<void> => {
    setProgress(0);
    setCount(0);
    setStatus(statusConst.idle);
    try {
      for (const prof of professions) {
        await httpService.put("profession/" + prof._id, prof);
        incrementCount();
      }
      for (const user of users) {
        await httpService.put("user/" + user._id, user);
        incrementCount();
      }
      for (const quality of qualities) {
        await httpService.put("quality/" + quality._id, quality);
        incrementCount();
      }
    } catch (error) {
      setError(error as string);
      setStatus(statusConst.error);
    }
  };

  return { error, initialize, progress, status };
};

export default useMockData;
