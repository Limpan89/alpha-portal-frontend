import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { API_URL } from "../Constants";

interface StatusValues {
  status: Status[];
  getStatus?(): Promise<void>;
}

const defaultValues: StatusValues = {
  status: [],
};

export interface Status {
  id: number;
  statusName: string;
}

export const defaultStatus: Status = {
  id: 0,
  statusName: "",
};

const StatusContext = createContext<StatusValues>(defaultValues);

export const StatusProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();

  const [status, setStatus] = useState<Status[]>([]);

  const getStatus = async () => {
    try {
      const res = await fetch(`${API_URL}/api/status`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setStatus(data);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStatus();
  }, [token]);

  return (
    <StatusContext.Provider value={{ status: status, getStatus: getStatus }}>
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
