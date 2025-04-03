import { Outlet } from "react-router-dom";

export const CenterLayout = () => {
  return (
    <div className="wrapper-centerscreen">
      <main>
        <Outlet />
      </main>
    </div>
  );
};
