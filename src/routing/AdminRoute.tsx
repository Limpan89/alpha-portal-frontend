import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  return token != null ? children : <Navigate to="/admin/projects" replace />;
};
