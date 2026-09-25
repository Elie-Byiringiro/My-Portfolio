import Reveal from './Reveal'
import { usePortfolioData } from '../lib/usePortfolioData'
import { fallbackProjects } from '../lib/fallbackData'

export default function Projects() {
  const { data: projects } = usePortfolioData('projects', fallbackProjects)

  return (
    <section className="section" id="projects">
      <Reveal>
        <header className="section-intro section-intro-plain">
          <div>
            <span className="section-eyebrow">Projects</span>
          </div>
          <p>Production-ready applications built from scratch.</p>
        </header>
      </Reveal>

      {projects.length === 0 ? (
        <div className="blog-empty">
          <span>∅</span>
          <p>No projects are available yet.</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project, index) => {
            const initials = project.name.replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase()
            const wide = projects.length === 1
            return (
              <Reveal key={project.id || project.name}>
                <article className={`project-card${wide ? ' project-card-wide' : ''}`}>
                  <div className="project-visual" aria-hidden="true">
                    <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="project-initials">{initials}</span>
                    <span className="project-type">{(project.tags || [])[0] || 'Web project'}</span>
                  </div>
                  <div className="project-body">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {(project.tags || []).map(tag => <span key={tag}>{tag}</span>)}
                    </div>
                    <div className="project-links">
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noreferrer">View live <span>↗</span></a>
                      )}
                      {project.source_url && (
                        <a href={project.source_url} target="_blank" rel="noreferrer">Source code <span>↗</span></a>
                      )}
                      {!project.live_url && !project.source_url && (
                        <a href="#contact">Discuss project <span>→</span></a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      )}
    </section>
  )
}
