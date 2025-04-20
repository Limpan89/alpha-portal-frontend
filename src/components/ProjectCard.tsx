import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Project } from "../contexts/ProjectContext";
import { TimeRemaining } from "./TimeRemaining";
import { useAuth } from "../contexts/AuthContext";
import { API_URL } from "../Constants";

export const ProjectCard = ({
  project,
  setSelected,
}: {
  project: Project;
  setSelected: React.Dispatch<React.SetStateAction<Project>>;
}) => {
  const [show, setShow] = useState<boolean>(false);
  const { token, apiKey } = useAuth();

  const handleShowClick = () => {
    setShow(!show);
  };

  const handleEditClick = () => {
    setSelected(project);
  };

  const handleDeleteClick = () => {
    deleteProject();
  };

  const deleteProject = async () => {
    const headers: HeadersInit = {
      Authorization: `Bearer ${token}`,
    };
    if (apiKey) {
      headers["X-ADM-API-KEY"] = apiKey;
    }

    console.log(API_URL + `/api/projects/${project.id}`);

    try {
      const response = await fetch(API_URL + `/api/projects/${project.id}`, {
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
    <section className="content project-card">
      <header className="project-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png"
          alt="Project image"
          className="project-image"
        />
        <div className="project-title">
          <h6 className="title">{project.projectName}</h6>
          <p className="client">{project.client.clientName}</p>
        </div>

        <div className="actions-container">
          <button
            type="button"
            datatype="drop-down"
            onClick={handleShowClick}
            className="btn-actions"
          >
            {" "}
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
                  <span>Delete Project</span>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div className="project-body">{project.description}</div>
      <footer className="project-footer">
        <TimeRemaining
          days={Math.ceil(
            Math.abs(new Date(project.endDate).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24)
          )}
        />
      </footer>
    </section>
  );
};
