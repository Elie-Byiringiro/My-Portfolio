import Icon from './Icons'
import { socialLinks } from '../lib/socials'

const QUICK_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#experience', label: 'Experience' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#skills', label: 'Skills' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
]

const STACK = [
  { id: 'react', icon: 'layers', label: 'React' },
  { id: 'node', icon: 'cloud', label: 'Node.js' },
  { id: 'express', icon: 'cogs', label: 'Express' },
  { id: 'javascript', icon: 'code', label: 'JavaScript' },
  { id: 'rest', icon: 'api', label: 'REST APIs' },
  { id: 'mongodb', icon: 'database_brand', label: 'MongoDB' },
  { id: 'docker', icon: 'container', label: 'Docker' },
  { id: 'linux', icon: 'linux', label: 'Linux' },
  { id: 'cicd', icon: 'rocket', label: 'CI/CD' },
]

const SOCIALS = socialLinks

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            <span>[</span>M4STER<span>]</span><i>_</i>
          </a>
          <p>
            Full-stack developer and cybersecurity analyst building functional, production-ready systems from
            Kigali, Rwanda.
          </p>
          <div className="footer-socials">
            {SOCIALS.map(item => (
              <a
                key={item.id}
                href={item.href}
                aria-label={`${item.label}: ${item.value}`}
                title={`${item.label} — ${item.value}`}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
                <span className="footer-social-handle">{item.value}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <ul>
            {QUICK_LINKS.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <ul>
            {SOCIALS.map(item => (
              <li key={item.id} className="footer-contact-item">
                <span className="footer-contact-icon" aria-hidden="true"><Icon name={item.icon} /></span>
                <a href={item.href} target={item.id === 'email' ? undefined : '_blank'} rel="noreferrer">
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h3>Built with</h3>
          <ul className="footer-stack">
            {STACK.map(item => (
              <li key={item.id}>
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Byiringiro Elie (M4STER)</span>
        <span>Designed &amp; built with React + Vite</span>
      </div>
    </footer>
  )
}
