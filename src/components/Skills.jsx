import Reveal from './Reveal'
import { usePortfolioData } from '../lib/usePortfolioData'
import { fallbackSkills } from '../lib/fallbackData'

const securitySkills = [
  { id: 'security-1', category: 'Cybersecurity', skill: 'Penetration testing', level: 'applied', percent: 68 },
  { id: 'security-2', category: 'Cybersecurity', skill: 'API security', level: 'applied', percent: 72 },
  { id: 'security-3', category: 'Cybersecurity', skill: 'Secure access control', level: 'applied', percent: 70 },
]

const focusAreas = ['Security-first', 'API architecture', 'Real-time systems', 'Reliable delivery']

const LEVEL_PERCENT = { advanced: 90, intermediate: 72, applied: 70, beginner: 55 }

const getPercent = skill => {
  if (Number.isFinite(Number(skill.percent))) return Math.min(100, Math.max(0, Number(skill.percent)))
  return LEVEL_PERCENT[String(skill.level || '').toLowerCase()] ?? 70
}

export default function Skills() {
  const { data: rows } = usePortfolioData('skills', fallbackSkills)
  const known = new Set(rows.map(skill => skill.skill))
  const merged = [...rows, ...securitySkills.filter(skill => !known.has(skill.skill))]
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
            A practical toolkit for building responsive interfaces, reliable APIs, secure data flows, and
            maintainable applications.
          </p>
        </header>
      </Reveal>

      <div className="skills-grid">
        {Object.entries(categories).map(([category, skills], categoryIndex) => (
          <Reveal key={category}>
            <article className="skill-card">
              <span className="skill-index">{String(categoryIndex + 1).padStart(2, '0')}</span>
              <h3>{category}</h3>
              <div className="skill-list">
                {skills.map(skill => (
                  <div className="skill-item" key={skill.id || skill.skill}>
                    <div className="skill-item-head">
                      <span>{skill.skill}</span>
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
