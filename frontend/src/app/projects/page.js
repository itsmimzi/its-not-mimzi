export const metadata = {
  title: "Projects | It's not Mimzi",
};

const projects = [
  {
    title: "Project One",
    description: "Short description of what this project does and why it exists.",
    github: "https://github.com/itsmimzi/project-one",
    demo: "https://example.com/project-one",
  },
  {
    title: "Project Two",
    description: "Short description of what this project does and why it exists.",
    github: "https://github.com/itsmimzi/project-two",
    demo: "",
  },
  {
    title: "Project Three",
    description: "Short description of what this project does and why it exists.",
    github: "https://github.com/itsmimzi/project-three",
    demo: "https://example.com/project-three",
  },
];

export default function ProjectsPage() {
  return (
    <main className="projects-container">
      <section className="projects-wrapper">
        <h1 className="projects-page-title">Projects</h1>
        <div className="projects-grid">
          {projects.map((p) => (
            <article key={p.title} className="project-card">
              <h2 className="project-title">{p.title}</h2>
              <p className="project-description">{p.description}</p>
              <div className="project-links">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer">
                    GitHub →
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer">
                    Demo →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
