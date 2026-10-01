import { useState } from 'react'
import Reveal from './Reveal'
import Icon from './Icons'
import TechIcon from './TechIcons'
import { techIconTint } from '../lib/techIcons'
import { usePortfolioData } from '../lib/usePortfolioData'
import { fallbackProjects } from '../lib/fallbackData'

export default function Projects() {
  const { data: projects } = usePortfolioData('projects', fallbackProjects)
  const [brokenImages, setBrokenImages] = useState({})

  const markImageBroken = project =>
    setBrokenImages(current => ({ ...current, [project.id || project.name]: true }))

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
          <span>âˆ…</span>
          <p>No projects are available yet.</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project, index) => {
            const initials = project.name.replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase()
            const wide = projects.length === 1
            const image = project.image_url
            const showImage = Boolean(image) && !brokenImages[project.id || project.name]
            const whatsapp = String(project.whatsapp || '').replace(/\D/g, '')
            return (
              <Reveal key={project.id || project.name}>
                <article className={`project-card${wide ? ' project-card-wide' : ''}`}>
                  <div className={`project-visual${showImage ? ' has-image' : ''}`}>
                    {showImage ? (
                      <img
                        className="project-image"
                        src={image}
                        alt={`${project.name} preview`}
                        loading="lazy"
                        decoding="async"
                        onError={() => markImageBroken(project)}
                      />
                    ) : (
                      <span className="project-initials" aria-hidden="true">{initials}</span>
                    )}
                    <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <span className="project-type">{(project.tags || [])[0] || 'Web project'}</span>
                  </div>
                  <div className="project-body">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {(project.tags || []).map(tag => (
                        <span key={tag}>
                          <span
                            className="tech-icon tech-icon-tag"
                            style={techIconTint(tag) ? { '--tech-tint': techIconTint(tag) } : undefined}
                            aria-hidden="true"
                          >
                            <TechIcon label={tag} />
                          </span>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noreferrer">
                          <Icon name="external" /> View live <span>â†—</span>
                        </a>
                      )}
                      {project.source_url && (
                        <a href={project.source_url} target="_blank" rel="noreferrer">
                          <Icon name="github" /> Source code <span>â†—</span>
                        </a>
                      )}
                      {whatsapp && (
                        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">
                          <Icon name="whatsapp" /> WhatsApp <span>â†—</span>
                        </a>
                      )}
                      {!project.live_url && !project.source_url && !whatsapp && (
                        <a href="#contact"><Icon name="chat" /> Discuss project <span>â†’</span></a>
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
