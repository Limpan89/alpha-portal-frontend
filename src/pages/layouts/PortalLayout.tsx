import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";

export const PortalLayout = () => {
  return (
    <div className="wrapper-portal">
      <Sidebar />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
