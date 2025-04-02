import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  return user != null ? children : <Navigate to="/auth/signin" replace />;
};
