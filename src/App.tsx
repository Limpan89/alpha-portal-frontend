import "./assets/css/style.css";
import "./assets/css/button.css";
import "./assets/css/form.css";
import "./assets/css/animate.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { routesConfig } from "./routing/RoutesConfig";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

export default function App() {
  const routing = useRoutes(routesConfig);

  return <>{routing}</>;
}
