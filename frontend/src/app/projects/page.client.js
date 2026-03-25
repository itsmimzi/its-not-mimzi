'use client'

import { useEffect, useState } from "react";

function goToRepo(url) {
    window.open(url, '_blank');
}

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);

                const [localRes, githubRes] = await Promise.all([
                    //fetch("http://127.0.0.1:8000/api/projects/"),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/`),
                    //fetch("http://127.0.0.1:8000/api/github-projects/")
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/github-projects/`)
                ]);

                if (!localRes.ok || !githubRes) {
                    throw new Error('Failed to fetch repositories and/or one of the project sources');
                }

                const localProjects = await localRes.json();
                const githubProjects = await githubRes.json();

                const filteredGithub = githubProjects
                    .filter(repo => !repo.fork)
                    .map(repo => ({
                        id: repo.id,
                        title: repo.title,
                        description: repo.description || 'No description available',
                        url: repo.url,
                    }));

                const combinedProjects = [
                    ...localProjects.map(p => ({
                        id: p.id,
                        title: p.title,
                        description: p.description,
                        url: p.repo_url,
                    })),
                    ...filteredGithub
                ];

                setProjects(combinedProjects);

            } catch (err) {
                setError(err.message);
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="projects-container">
                <section className="projects-wrapper">
                    <div className="projects-page-title"> Projects</div>
                    <div className="project-description">Loading projects...</div>
                </section>
            </div>
        );
    }

    if (error) {
        return (
            <div className="projects-container">
                <section className="projects-wrapper">
                    <div className="projects-page-title"> Projects</div>
                    <div className="project-description">Error Loading projects 555:
                        {error}
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="projects-container">
            <section className="projects-wrapper">
                <div className="projects-page-title">Projects</div>
                {projects.map((project) => (
                <div key={project.id} className="project-wrapper">
                    <div className="project-title">{project.title}</div>
                    <p className="project-description">{project.description}</p>
                    <button
                        className="learn-more-button"
                        onClick={() => goToRepo(project.url)}
                    >
                        →
                    </button>
                </div>
                ))}
                {projects.length === 0 && (
                <div className="no-projects-message">
                    No projects yet.
                </div>
                )}
            </section>
        </div>
    );
}
