import { EditDropdown } from "./EditDropdown";
import { TimeRemaining } from "./TimeRemaining";

export const ProjectCard = ({
  project,
  client,
  description,
  days,
}: {
  project: string;
  client: string;
  description: string;
  days: number;
}) => {
  return (
    <section className="content project-card">
      <header className="project-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png"
          alt="Project image"
          className="project-image"
        />
        <div className="project-title">
          <h6 className="title">{project}</h6>
          <p className="client">{client}</p>
        </div>
        <EditDropdown />
      </header>
      <div className="project-body">{description}</div>
      <footer className="project-footer">
        <TimeRemaining days={days} />
      </footer>
    </section>
  );
};
