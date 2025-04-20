import { useEffect, useState } from "react";
import { AddProjectModal } from "../components/AddProjectModal";
import { EditProjectModal } from "../components/EditProjectModal";
import { ProjectCard } from "../components/ProjectCard";
import {
  defaultProject,
  Project,
  useProject,
} from "../contexts/ProjectContext";

export const Projects = () => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [selected, setSelected] = useState<Project>(defaultProject);
  const { projects } = useProject();

  const HandleAddClick = () => {
    setShowAdd(true);
  };

  useEffect(() => {
    if (selected.id != defaultProject.id) setShowEdit(true);
  }, [selected]);

  return (
    <div id="projects">
      <header className="page-header">
        <h1 className="h1">Projects</h1>
        <button
          type="button"
          data-modal="true"
          onClick={HandleAddClick}
          className="btn btn-add"
        >
          <span>Add Project</span>
        </button>
      </header>
      <div className="card-container">
        {projects.map((p) => (
          <ProjectCard project={p} setSelected={setSelected} />
        ))}
      </div>
      <AddProjectModal show={showAdd} close={setShowAdd} />
      <EditProjectModal
        show={showEdit}
        close={setShowEdit}
        project={selected}
      />
    </div>
  );
};
