import { Outlet } from "react-router-dom";

export const CenterLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
