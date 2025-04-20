import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { API_URL } from "../Constants";
import { User } from "./UserContext";
import { SignUpValues } from "../pages/SignUp";
import { useNavigate } from "react-router-dom";

interface AuthResponse {
  token: string;
  isAdmin: boolean;
  apiKey: string | null;
  user: User;
}

export interface AuthValues {
  loading: boolean;
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  apiKey: string | null;
  signUp?(values: SignUpValues): Promise<void>;
  signIn?(email: string, password: string): Promise<void>;
  signOut?(): Promise<void>;
  authFetch?(url: string, options?: RequestInit): Promise<Response>;
}

const defaultValues: AuthValues = {
  loading: true,
  user: null,
  token: null,
  isAdmin: false,
  apiKey: null,
};

const AuthContext = createContext<AuthValues>(defaultValues);
export const useAuth = (): AuthValues => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) setToken(authToken);
    setLoading(false);
  }, []);

  const signUp = async ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    termsAndConditions,
  }: SignUpValues) => {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        termsAndConditions,
      }),
    });

    if (response.ok) navigate("/auth/signin", { replace: true });
  };

  const signIn = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data: AuthResponse = await response.json();
      localStorage.setItem("authToken", data.token);
      setUser(data.user);
      setToken(data.token);
      setApiKey(data.apiKey);
      setIsAdmin(data.isAdmin);
      navigate("/admin/projects", { replace: true });
    }
  };

  const signOut = async () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    setIsAdmin(false);
    setUser(null);
  };

  const authFetch = async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    const headers: Headers = options.headers
      ? ({ ...options.headers } as Headers)
      : new Headers();
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }
    if (apiKey) {
      headers.append("X-ADM-API-KEY", apiKey);
    }
    return await fetch(`${API_URL}${url}`, { ...options, headers });
  };

  return (
    <AuthContext.Provider
      value={{
        loading: loading,
        user: user,
        token: token,
        isAdmin: isAdmin,
        apiKey: apiKey,
        signUp: signUp,
        signIn: signIn,
        signOut: signOut,
        authFetch: authFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
