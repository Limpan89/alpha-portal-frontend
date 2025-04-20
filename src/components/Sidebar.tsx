import { LogotypeLink } from "./LogotypeLink";
import { NavLinks } from "./NavLinks";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <LogotypeLink />
      <NavLinks />
    </aside>
  );
};
