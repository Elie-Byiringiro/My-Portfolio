import { useEffect, useState } from 'react'

const THEME_KEY = 'portfolio-theme'
const isTheme = value => value === 'dark' || value === 'light'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#skills', label: 'Skills' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [progress, setProgress] = useState(0)
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = document.querySelectorAll('section[id]')
      let current = 'home'
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 140) current = sec.id
      })
      setActive(current)

      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const selectedTheme = isTheme(theme) ? theme : 'light'
    document.documentElement.dataset.theme = selectedTheme
    localStorage.setItem(THEME_KEY, selectedTheme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      selectedTheme === 'dark' ? '#11110f' : '#faf9f4',
    )
  }, [theme])

  useEffect(() => {
    const syncTheme = event => {
      if (event.key === THEME_KEY && isTheme(event.newValue)) setTheme(event.newValue)
    }
    window.addEventListener('storage', syncTheme)
    return () => window.removeEventListener('storage', syncTheme)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = event => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="nav-inner">
        <a href="#home" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-bracket">[</span>
          <span className="logo-path">M4STER</span>
          <span className="logo-bracket">]</span>
          <span className="logo-cursor" aria-hidden="true">_</span>
        </a>
        <nav className={`nav-links${open ? ' open' : ''}`}>
          {LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link${active === link.href.slice(1) ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        {open && (
          <button
            className="nav-backdrop"
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
          ></button>
        )}
        <div className="nav-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme(nextTheme)}
            aria-label={`Switch to ${nextTheme} mode`}
            aria-pressed={theme === 'light'}
            title={`Switch to ${nextTheme} mode`}
          >
            <span>{nextTheme}</span>
          </button>
          <button
            className={`hamburger${open ? ' open' : ''}`}
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  )
}