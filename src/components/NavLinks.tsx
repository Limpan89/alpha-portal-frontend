import { NavLink } from "react-router-dom";
import { FaBriefcase, FaHandshake } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { useAuth } from "../contexts/AuthContext";

export const NavLinks = () => {
  const { isAdmin } = useAuth();

  return (
    <nav className="nav-links">
      <NavLink to="/admin/projects" className="nav-link">
        <FaBriefcase />
        <span>Projects</span>
      </NavLink>
      {isAdmin && (
        <>
          <NavLink to="/admin/members" className="nav-link">
            <FaUserGroup />
            <span>Team Members</span>
          </NavLink>
          <NavLink to="/admin/clients" className="nav-link">
            <FaHandshake />
            <span>Clients</span>
          </NavLink>
        </>
      )}
    </nav>
  );
};
