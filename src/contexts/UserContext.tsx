import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { API_URL } from "../Constants";

interface UserValues {
  users: User[];
  getUsers?(): Promise<void>;
}

const defaultValues: UserValues = {
  users: [],
};

export interface PostalAddress {
  postalCode: number;
  cityName: string;
}

export const defaultPostalAddress: PostalAddress = {
  postalCode: 0,
  cityName: "",
};

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  jobTitle: string | null;
  image: string | null;
  streetAddress: string | null;
  role: string;
  postalAddress: PostalAddress;
}

export const defaultUser: User = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  phone: null,
  jobTitle: null,
  image: null,
  streetAddress: null,
  role: "",
  postalAddress: defaultPostalAddress,
};

const UserContext = createContext<UserValues>(defaultValues);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();

  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUsers(data);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [token]);

  return (
    <UserContext.Provider value={{ users: users, getUsers: getUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
