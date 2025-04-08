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
  const RemaningTime = (days: number): string => {
    const weeks = Math.floor(days / 7);
    if (weeks === 0) return `${days} ${days > 1 ? "days" : "day"} left`;
    return `${weeks} ${weeks > 1 ? "weeks" : "week"} left`;
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
          <h6 className="title">{project}</h6>
          <p className="client">{client}</p>
        </div>
      </header>
      <div className="project-body">{description}</div>
      <footer className="project-footer">{RemaningTime(days)}</footer>
    </section>
  );
};
