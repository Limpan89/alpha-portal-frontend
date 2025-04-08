import { ModalButton } from "../components/ModalButton";
import { ProjectCard } from "../components/ProjectCard";

export const Projects = () => {
  return (
    <div id="projects">
      <header className="page-header">
        <h1 className="h1">Projects</h1>
        <ModalButton type="add" target="#" text="Add Project" />
      </header>
      <div className="card-container">
        <ProjectCard
          project={"Test Project"}
          client={"Test Client, Inc."}
          description={
            "A test project for testing the design of project cards."
          }
          days={5}
        />
        <ProjectCard
          project={"Test Project"}
          client={"Test Client, Inc."}
          description={
            "A test project for testing the design of project cards."
          }
          days={5}
        />
        <ProjectCard
          project={"Test Project"}
          client={"Test Client, Inc."}
          description={
            "A test project for testing the design of project cards."
          }
          days={5}
        />
        <ProjectCard
          project={"Test Project"}
          client={"Test Client, Inc."}
          description={
            "A test project for testing the design of project cards."
          }
          days={5}
        />
      </div>
    </div>
  );
};
