const QUICK_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#skills', label: 'Skills' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
]

const STACK = ['React', 'Node.js', 'Express', 'JavaScript', 'MongoDB', 'C#']

const SOCIALS = [
  { id: 'email', label: 'Email', value: 'byiringiroelie468@gmail.com', href: 'mailto:byiringiroelie468@gmail.com' },
  { id: 'whatsapp', label: 'WhatsApp', value: '0783547443', href: 'https://wa.me/0783547443' },
  { id: 'instagram', label: 'Instagram', value: 'elie__001', href: 'https://instagram.com/elie__001' },
  { id: 'github', label: 'GitHub', value: 'github.com/elie', href: 'https://github.com/elie' },
]

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
              <a key={item.id} href={item.href} target={item.id === 'email' ? undefined : '_blank'} rel="noreferrer">
                {item.label}
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
              <li key={item.id}>
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
            {STACK.map(item => <li key={item}>{item}</li>)}
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
