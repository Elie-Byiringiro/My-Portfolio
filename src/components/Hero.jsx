import { useState } from 'react'
import CountUp from './CountUp'
import Reveal from './Reveal'
import Icon from './Icons'
import { usePortfolioData } from '../lib/usePortfolioData'
import { fallbackProfile } from '../lib/fallbackData'

const ROLES = [
  ['Full-Stack Developer'],
  ['Cybersecurity'],
  ['API'],
]

const ROLE_ICONS = {
  'Full-Stack Developer': 'code',
  Cybersecurity: 'shield',
  API: 'api',
}

const PROFILE_STATS = [
  { id: 'experience', value: 2, label: 'Years Exp.' },
  { id: 'projects', value: 6, label: 'Projects' },
  { id: 'pagespeed', value: 95, label: 'PageSpeed' },
  { id: 'kchats', value: 238, label: 'K-Chart' },
]

const GITHUB_URL = 'https://github.com/elie'

const ROLE_TOKENS = ROLES.map(role => {
  const phrase = role.join(' ')
  return { word: phrase, key: phrase }
})

function RoleList() {
  return (
    <div className="role-list" aria-label="Professional roles">
      <span className="role-line">
        {ROLE_TOKENS.map((token, index) => (
          <span className="role-word" key={token.key}>
            <Icon name={ROLE_ICONS[token.word]} className="role-word-icon" />
            <span className="role-word-typed">{token.word}</span>
            {index < ROLE_TOKENS.length - 1 ? ', ' : null}
          </span>
        ))}
      </span>
    </div>
  )
}

export default function Hero() {
  const name = 'Byiringiro Elie'
  const initials = name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase()
  const [photoOk, setPhotoOk] = useState(true)
  const { data: profile } = usePortfolioData('profile', fallbackProfile)
  const githubUrl = profile?.github ? `https://github.com/${profile.github}` : GITHUB_URL

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-text">
          <div className="availability">
            <span className="status-dot" aria-hidden="true"></span>
            Available for new opportunities
          </div>
          <div className="identity">
            <h1 className="name">{name}</h1>
            <span className="hero-alias">(M4STER)</span>
          </div>
          <RoleList />
          <p className="hero-description">
            I build and host production platforms — secure APIs, authenticated dashboards, reliable databases
            and deployments that stay online. Need an API built, a platform hosted, or both? Let&rsquo;s talk.
          </p>
          <div className="hero-meta">
            <span>Kigali, Rwanda</span>
            <a href="mailto:byiringiroelie468@gmail.com">byiringiroelie468@gmail.com</a>
          </div>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              <span className="btn-caret">↗</span> View Projects
            </a>
            <a href="#contact" className="btn btn-ghost">
              <span className="btn-caret">→</span> Contact Me
            </a>
            <a className="btn btn-ghost" href={githubUrl} target="_blank" rel="noreferrer">
              <span className="btn-caret">
                <Icon name="github" />
              </span>
              GitHub
            </a>
          </div>

          <div className="hero-wordmark" aria-hidden="true">
            <span className="logo-bracket">[</span>
            <span>M4STER</span>
            <span className="logo-bracket">]</span>
            <span className="logo-cursor">_</span>
          </div>
        </div>

        <div className="hero-side">
          <Reveal className="profile-wrap">
            <div className="profile">
              <div className="profile-frame">
                {photoOk ? (
                  <img
                    src="/profile-photo.png"
                    alt={`${name} profile portrait`}
                    onError={() => setPhotoOk(false)}
                  />
                ) : (
                  <span className="profile-fallback">{initials}</span>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal className="profile-stats">
            {PROFILE_STATS.map(stat => (
              <div className={`profile-stat${stat.tone ? ` profile-stat-${stat.tone}` : ''}`} key={stat.id}>
                <strong><CountUp end={stat.value} suffix={stat.suffix} /></strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </Reveal>

          <Reveal className="hero-side-extra">
            <button
              className="profile-chat"
              type="button"
              onClick={() => window.dispatchEvent(new Event('open-elie-chat'))}
            >
              <span className="profile-chat-avatar">M</span>
              <span className="profile-chat-copy">
                <strong>Ask elie-bot</strong>
                <small>Chat about my work, skills or projects</small>
              </span>
              <span className="profile-chat-arrow" aria-hidden="true">→</span>
            </button>
          </Reveal>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to about section">
        <span>SCROLL</span>
        <span className="cue-line"></span>
      </a>
    </section>
  )
}