import { Outlet } from "react-router-dom";

export const PortalLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
