import { useState } from 'react'
import CountUp from './CountUp'
import Reveal from './Reveal'

const ROLES = [
  ['Full-Stack', 'Developer'],
  ['Cybersecurity', 'Analyst'],
  ['API', 'Architect'],
]

const WORD_ICONS = {
  'Full-Stack': (
    <>
      <path d="m8 9-3 3 3 3" />
      <path d="m16 9 3 3-3 3" />
      <path d="m14 5-4 14" />
    </>
  ),
  Developer: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3" />
      <path d="M12 15h5" />
    </>
  ),
  Cybersecurity: (
    <>
      <path d="M12 3 5 6v5c0 4.6 2.9 8.2 7 10 4.1-1.8 7-5.4 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  Analyst: (
    <>
      <path d="M4 19V9" />
      <path d="M10 19V5" />
      <path d="M16 19v-7" />
      <path d="M3 19h18" />
    </>
  ),
  API: (
    <>
      <circle cx="5" cy="12" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="m7 11 10-4M7 13l10 4" />
    </>
  ),
  Architect: (
    <>
      <path d="M4 21V8l8-5 8 5v13" />
      <path d="M8 21v-6h8v6" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" />
    </>
  ),
}

const PROFILE_STATS = [
  { id: 'experience', value: 3, suffix: '+', label: 'Years Exp.' },
  { id: 'projects', value: 6, suffix: '+', label: 'Projects' },
  { id: 'pagespeed', value: 95, suffix: '+', label: 'PageSpeed' },
]

function RoleList() {
  return (
    <div className="role-list" aria-label="Professional roles">
      {ROLES.map(role => (
        <span className="role-item" key={role.join('-')}>
          {role.map(word => (
            <span className="role-word" key={`${role.join('-')}-${word}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                {WORD_ICONS[word]}
              </svg>
              <span className="role-word-label">{word}</span>
            </span>
          ))}
        </span>
      ))}
    </div>
  )
}

export default function Hero() {
  const name = 'Byiringiro Elie'
  const initials = name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase()
  const [photoOk, setPhotoOk] = useState(true)

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
            Building functional, production-ready systems — secure APIs, reliable dashboards, authentication flows, and data-driven applications that solve real-world problems.
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

          <Reveal className="hero-side-extra">
            <div className="profile-stats">
              {PROFILE_STATS.map(stat => (
                <div className="profile-stat" key={stat.id}>
                  <strong><CountUp end={stat.value} suffix={stat.suffix} /></strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

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