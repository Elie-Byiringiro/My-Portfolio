import Reveal from './Reveal'
import CountUp from './CountUp'
import { usePortfolioData } from '../lib/usePortfolioData'
import { fallbackExperience, fallbackExperienceStats } from '../lib/fallbackData'

export default function Experience() {
  const { data: timeline } = usePortfolioData('experience', fallbackExperience)
  const experience = timeline.filter(item => item.period !== 'next')

  return (
    <section className="section" id="experience">
      <Reveal>
        <header className="section-intro">
          <div>
            <span className="section-eyebrow">Experience</span>
            <h2>Work Timeline</h2>
          </div>
          <p>My professional journey so far.</p>
        </header>
      </Reveal>

      <div className="experience-grid">
        {experience.map((item, index) => (
          <Reveal key={item.id || `${item.period}-${item.role}`}>
            <article className="experience-card">
              <div className="experience-card-head">
                <span className="experience-number">{String(index + 1).padStart(2, '0')}</span>
                {item.type && <span className="experience-type">{item.type}</span>}
                <span className="experience-period">{item.period}</span>
              </div>
              <h3>{item.role}</h3>
              <p className="experience-place">{item.place}</p>
              <p className="experience-text">{item.text}</p>
              <div className="experience-tags">
                {(item.tags || []).map(tag => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="stats-strip">
          {fallbackExperienceStats.map(stat => (
            <div className="stat" key={stat.id}>
              <span className="stat-value">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
