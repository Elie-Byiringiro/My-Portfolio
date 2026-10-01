import Reveal from './Reveal'
import Icon from './Icons'

const SERVICES = [
  {
    id: 'api',
    icon: 'api',
    title: 'API Development',
    text: 'REST and GraphQL APIs with predictable contracts, validation, authentication and rate limits — documented so any frontend can consume them.',
    points: ['REST & GraphQL', 'Auth & rate limits', 'API documentation'],
    media: '/projects/dentrix-api.jpg',
    mediaAlt: 'Expert Dentrix API Integration Service branding',
  },
  {
    id: 'hosting',
    icon: 'host',
    title: 'Platform Hosting',
    text: 'Full-stack platforms hosted on Linux VPS with process management, logging and a real live URL — not just a project that runs on one laptop.',
    points: ['Linux VPS', 'Process & logs', 'Live production URL'],
    media: '/projects/hosting-deployment.jpg',
    mediaAlt: 'Managed IT cloud solutions',
  },
  {
    id: 'deployment',
    icon: 'deploy',
    title: 'Deployment & CI/CD',
    text: 'Domain, DNS and SSL wired up, plus a repeatable deploy pipeline so every release is a push instead of a manual ritual.',
    points: ['Domains, DNS & SSL', 'Automated builds', 'Rollbacks'],
  },
  {
    id: 'monitoring',
    icon: 'monitor',
    title: 'Maintenance & Monitoring',
    text: 'Uptime checks, backups and patching after launch, so your API and platform keep serving when clients are using them.',
    points: ['Uptime monitoring', 'Backups', 'Updates & patches'],
  },
  {
    id: 'security',
    icon: 'shield',
    title: 'API Security',
    text: 'Security-first engineering: hardened endpoints, access control and penetration testing informed by a cybersecurity background.',
    points: ['Hardened endpoints', 'Pen testing', 'Access control'],
  },
  {
    id: 'data',
    icon: 'database',
    title: 'Databases & Performance',
    text: 'Schema design, indexing and query tuning so the API answers fast and the platform stays responsive under real traffic.',
    points: ['Schema design', 'Indexing', 'Query tuning'],
  },
]

export default function Services() {
  return (
    <section className="section" id="services">
      <Reveal>
        <header className="section-intro">
          <div>
            <span className="section-eyebrow">Services</span>
            <h2>Build it, then host it.</h2>
          </div>
          <p>
            Everything needed to take a platform from an idea to a live, secure, monitored API — development and
            hosting handled end to end, so nothing is left for you to figure out.
          </p>
        </header>
      </Reveal>

      <div className="services-grid">
        {SERVICES.map((service, index) => (
          <Reveal key={service.id}>
            <article className="service-card">
              {service.media && (
                <div className="service-media">
                  <img src={service.media} alt={service.mediaAlt} loading="lazy" decoding="async" />
                </div>
              )}
              <div className="service-card-top">
                <span className="service-icon" aria-hidden="true"><Icon name={service.icon} /></span>
                <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul className="service-points">
                {service.points.map(point => (
                  <li key={point}>
                    <span className="service-check" aria-hidden="true">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="services-cta">
          <p>Need an API built, a platform hosted, or both?</p>
          <a href="#contact" className="btn btn-primary">
            <span className="btn-caret">→</span> Start a Project
          </a>
        </div>
      </Reveal>
    </section>
  )
}
