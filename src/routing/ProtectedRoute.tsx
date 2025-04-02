import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return user != null ? children : <Navigate to="/auth/signin" replace />;
};
