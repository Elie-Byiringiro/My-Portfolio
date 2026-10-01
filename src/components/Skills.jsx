import Reveal from './Reveal'
import Icon from './Icons'
import TechIcon from './TechIcons'
import { techIconTint } from '../lib/techIcons'
import { usePortfolioData } from '../lib/usePortfolioData'
import { fallbackSkills } from '../lib/fallbackData'

const CATEGORY_ICONS = {
  Languages: 'code',
  Frontend: 'brush',
  'Backend & Tools': 'terminal',
  Cybersecurity: 'shield',
  'Hosting & DevOps': 'host',
}

const getCategoryIcon = category => {
  const known = CATEGORY_ICONS[category]
  if (known) return known
  const match = Object.keys(CATEGORY_ICONS).find(key => category.toLowerCase().includes(key.toLowerCase()))
  return match ? CATEGORY_ICONS[match] : 'layers'
}

const securitySkills = [
  { id: 'security-1', category: 'Cybersecurity', skill: 'Penetration testing', level: 'applied', percent: 68 },
  { id: 'security-2', category: 'Cybersecurity', skill: 'API security', level: 'applied', percent: 72 },
  { id: 'security-3', category: 'Cybersecurity', skill: 'Secure access control', level: 'applied', percent: 70 },
]

const hostingSkills = [
  { id: 'hosting-1', category: 'Hosting & DevOps', skill: 'Linux servers (VPS)', level: 'intermediate', percent: 76 },
  { id: 'hosting-2', category: 'Hosting & DevOps', skill: 'Nginx & reverse proxies', level: 'intermediate', percent: 72 },
  { id: 'hosting-3', category: 'Hosting & DevOps', skill: 'Docker containers', level: 'intermediate', percent: 70 },
  { id: 'hosting-4', category: 'Hosting & DevOps', skill: 'CI/CD pipelines', level: 'intermediate', percent: 74 },
  { id: 'hosting-5', category: 'Hosting & DevOps', skill: 'Domains, DNS & SSL', level: 'applied', percent: 78 },
  { id: 'hosting-6', category: 'Hosting & DevOps', skill: 'Backups & uptime monitoring', level: 'applied', percent: 72 },
]

const focusAreas = [
  'Security-first',
  'API architecture',
  'Platform hosting',
  'Deployment automation',
  'Real-time systems',
  'Reliable delivery',
]

const LEVEL_PERCENT = { advanced: 90, intermediate: 72, applied: 70, beginner: 55 }

const getPercent = skill => {
  if (Number.isFinite(Number(skill.percent))) return Math.min(100, Math.max(0, Number(skill.percent)))
  return LEVEL_PERCENT[String(skill.level || '').toLowerCase()] ?? 70
}

export default function Skills() {
  const { data: rows } = usePortfolioData('skills', fallbackSkills)
  const known = new Set(rows.map(skill => skill.skill))
  const extras = [...securitySkills, ...hostingSkills].filter(skill => !known.has(skill.skill))
  const merged = [...rows, ...extras]
  const categories = merged.reduce((groups, skill) => {
    if (!groups[skill.category]) groups[skill.category] = []
    groups[skill.category].push(skill)
    return groups
  }, {})

  return (
    <section className="section" id="skills">
      <Reveal>
        <header className="section-intro">
          <div>
            <span className="section-eyebrow">Skills &amp; tools</span>
            <h2>The stack behind the work.</h2>
          </div>
          <p>
            A practical toolkit for building responsive interfaces, reliable APIs, secure data flows, and the
            servers that keep them online â€” deployment, domains, SSL and monitoring included.
          </p>
        </header>
      </Reveal>

      <div className="skills-grid">
        {Object.entries(categories).map(([category, skills], categoryIndex) => (
          <Reveal key={category}>
            <article className="skill-card">
              <span className="skill-index">{String(categoryIndex + 1).padStart(2, '0')}</span>
              <span className="skill-icon" aria-hidden="true">
                <Icon name={getCategoryIcon(category)} />
              </span>
              <h3>{category}</h3>
              <div className="skill-list">
                {skills.map(skill => (
                  <div className="skill-item" key={skill.id || skill.skill}>
                    <div className="skill-item-head">
                      <span className="skill-item-name">
                        <span
                          className="tech-icon"
                          style={techIconTint(skill.skill) ? { '--tech-tint': techIconTint(skill.skill) } : undefined}
                          aria-hidden="true"
                        >
                          <TechIcon label={skill.skill} />
                        </span>
                        {skill.skill}
                      </span>
                      <strong>{getPercent(skill)}%</strong>
                    </div>
                    <span className="skill-bar">
                      <span style={{ width: `${getPercent(skill)}%` }}></span>
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="skill-focus">
          <span>How I work</span>
          <div>
            {focusAreas.map(area => <strong key={area}>{area}</strong>)}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
