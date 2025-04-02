import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface AuthValues {
  loading: boolean;
  user: string | null;
  token: string | null;
  signUp?(): Promise<void>;
  signIn?(): Promise<void>;
  signOut?(): Promise<void>;
  authFetch?(url: string, options?: RequestInit): Promise<Response>;
}

const defaultValues: AuthValues = {
  loading: true,
  user: null,
  token: null,
};

const AuthContext = createContext<AuthValues>(defaultValues);
export const useAuth = (): AuthValues => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>("null");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) setToken(authToken);
    setLoading(true);
  }, []);

  const signUp = async () => {};

  const signIn = async () => {};

  const signOut = async () => {
    localStorage.removeItem("authToken");
    setToken(null);
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
    return fetch(url, { ...options, headers });
  };

  return (
    <AuthContext.Provider
      value={{
        loading: loading,
        user: user,
        token: token,
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
