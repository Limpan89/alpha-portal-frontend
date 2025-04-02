import { CenterLayout } from "../pages/layouts/CenterLayout";
import { SignUp } from "../pages/SignUp";
import { SignIn } from "../pages/SignIn";
import { ProtectedRoute } from "./ProtectedRoute";
import { Projects } from "../pages/Projects";
import { Members } from "../pages/Members";
import { Clients } from "../pages/Clients";
import { PortalLayout } from "../pages/layouts/PortalLayout";
import { AdminRoute } from "./AdminRoute";
import { Navigate } from "react-router-dom";

export const routesConfig = [
  {
    element: <CenterLayout />,
    children: [
      { path: "/auth/signin", element: <SignIn /> },
      { path: "/auth/signup", element: <SignUp /> },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <PortalLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/admin/projects", element: <Projects /> },
      {
        path: "/admin/members",
        element: (
          <AdminRoute>
            <Members />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/clients",
        element: (
          <AdminRoute>
            <Clients />
          </AdminRoute>
        ),
      },
      { path: "*", element: <Navigate to="/admin/projects" replace /> },
    ],
  },
];
