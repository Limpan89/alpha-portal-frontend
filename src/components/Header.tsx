import { Link } from "react-router-dom";
import { FaSignOutAlt, FaCog } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const Header = () => {
  const [show, setShow] = useState<boolean>(false);
  const { signOut, user } = useAuth();

  const handleShowClick = () => {
    setShow(!show);
  };

  return (
    <header className="header">
      <div className="profile">
        <div id="account-container">
          <button
            type="button"
            datatype="dropdown"
            className="btn-account"
            onClick={handleShowClick}
          >
            <img src={user?.image ?? ""} alt="Profile image" />
          </button>
          <section
            id="account-dropdown"
            className={`dropdown ${show ? "show" : ""}`}
          >
            <div className="account-header dropdown-header">
              <img src={user?.image ?? ""} alt="Profile image" />
              <span>{user?.email}</span>
            </div>
            <div className="dropdown-body">
              <nav className="dropdown-options">
                <div className="dropdown-option">
                  <label htmlFor="darkModeToggle" className="switch-label">
                    <FaCog />
                    <span>Dark Mode</span>
                  </label>
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="darkModeToggle"
                      datatype="toggle"
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </nav>
              <div className="divider"></div>
              <nav className="dropdown-actions">
                <Link
                  to="/auth/signin"
                  onClick={signOut}
                  className="text-link dropdown-action"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </Link>
              </nav>
            </div>
            <div></div>
          </section>
        </div>
      </div>
    </header>
  );
};
