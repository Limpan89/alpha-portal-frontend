import { FaRegEdit } from "react-icons/fa";
import { User } from "../contexts/UserContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { API_URL } from "../Constants";
import { useAuth } from "../contexts/AuthContext";

export const UserCard = ({
  user,
  setSelected,
}: {
  user: User;
  setSelected: React.Dispatch<React.SetStateAction<User>>;
}) => {
  const [show, setShow] = useState<boolean>(false);
  const { token, apiKey } = useAuth();

  const handleShowClick = () => {
    setShow(!show);
  };

  const handleEditClick = () => {
    setSelected(user);
  };

  const handleDeleteClick = () => {
    deleteUser();
  };

  const deleteUser = async () => {
    const headers: HeadersInit = {
      Authorization: `Bearer ${token}`,
    };
    if (apiKey) {
      headers["X-ADM-API-KEY"] = apiKey;
    }

    console.log(API_URL + `/api/users/${user.id}`);

    try {
      const response = await fetch(API_URL + `/api/users/${user.id}`, {
        method: "DELETE",
        headers,
      });

      if (response.ok) {
        console.log("Project deleted successfully");
      } else {
        console.error("Failed to delete project", response.status);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <section className="card user-card">
      <div className="actions-container">
        <button
          type="button"
          datatype="drop-down"
          onClick={handleShowClick}
          className="btn-actions"
        >
          <div className="meatballs">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </button>
        <div className={`dropdown ${show ? "show" : ""}`}>
          <div className="dropdown-body">
            <nav className="dropdown-actions">
              <div className="dropdown-action" onClick={handleEditClick}>
                <FaRegEdit />
                <span>Edit</span>
              </div>
              <div className="divider"></div>
              <div className="dropdown-action" onClick={handleDeleteClick}>
                <RiDeleteBin6Line />
                <span>Delete Member</span>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <header className="card-header user-header">
        <img src={user.image ?? ""} alt="profile image" />
        <h4>{`${user.firstName} ${user.lastName}`}</h4>
        <div className="jobtitle">{user.jobTitle ?? "TBD"}</div>
      </header>
      <div className="card-body">
        <div>{user.email}</div>
        <div>{user.phone ?? ""}</div>
      </div>
      <footer className="user-footer">
        <div>{user.role === "Admin" ? "Administrator" : ""}</div>
      </footer>
    </section>
  );
};
