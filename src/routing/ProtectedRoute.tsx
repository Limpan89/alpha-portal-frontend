import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  return token != null ? children : <Navigate to="/auth/signin" replace />;
};
