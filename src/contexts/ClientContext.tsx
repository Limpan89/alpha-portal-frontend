import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { API_URL } from "../Constants";
import { defaultPostalAddress, PostalAddress } from "./UserContext";

interface ClientValues {
  clients: Client[];
  getClients?(): Promise<void>;
}

const defaultValues: ClientValues = {
  clients: [],
};

export interface Client {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  image: string | null;
  billingAddress: string;
  billingReference: string;
  created: Date;
  postalAddress: PostalAddress;
}

export const defaultClient: Client = {
  id: "",
  clientName: "",
  email: "",
  phone: "",
  image: null,
  billingAddress: "",
  billingReference: "",
  created: new Date(),
  postalAddress: defaultPostalAddress,
};

const ClientContext = createContext<ClientValues>(defaultValues);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();

  const [clients, setClients] = useState<Client[]>([]);

  const getClients = async () => {
    try {
      const res = await fetch(`${API_URL}/api/clients`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setClients(data);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClients();
  }, [token]);

  return (
    <ClientContext.Provider
      value={{ clients: clients, getClients: getClients }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => useContext(ClientContext);
