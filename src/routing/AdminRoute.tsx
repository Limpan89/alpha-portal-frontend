import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/admin/projects" replace />;
};
