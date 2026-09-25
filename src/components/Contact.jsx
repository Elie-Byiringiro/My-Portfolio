import { useState } from 'react'
import Reveal from './Reveal'
import { usePortfolioData } from '../lib/usePortfolioData'
import { fallbackProfile } from '../lib/fallbackData'

const ICONS = {
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3.5h3.5l1.8 4.2-2.2 1.4a12 12 0 0 0 5.3 5.3l1.4-2.2 4.2 1.8V18a2.5 2.5 0 0 1-2.7 2.5A16.5 16.5 0 0 1 2.5 6.2 2.5 2.5 0 0 1 5 3.5Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" className="icon-dot" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 19c-4 1.2-4-2.2-5.5-2.7M15 21v-3.4a3 3 0 0 0-.8-2.3c2.6-.3 5.3-1.3 5.3-5.8a4.5 4.5 0 0 0-1.2-3.1 4.2 4.2 0 0 0-.1-3.1s-1-.3-3.3 1.2a11 11 0 0 0-5.8 0C6.8 3 5.8 3.3 5.8 3.3a4.2 4.2 0 0 0-.1 3.1A4.5 4.5 0 0 0 4.5 9.5c0 4.5 2.7 5.5 5.3 5.8a3 3 0 0 0-.8 2.2V21" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
}

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const { data: profile } = usePortfolioData('profile', fallbackProfile)
  const [form, setForm] = useState(EMPTY_FORM)
  const [sent, setSent] = useState(false)

  const email = profile?.email || 'byiringiroelie468@gmail.com'
  const whatsapp = String(profile?.whatsapp || '0783547443').replace(/\s/g, '')
  const instagram = profile?.instagram || 'elie__001'
  const github = profile?.github || 'elie'
  const location = profile?.location || 'Kigali, Rwanda'

  const details = [
    { id: 'email', icon: 'mail', label: 'Email', value: email, href: `mailto:${email}` },
    { id: 'whatsapp', icon: 'phone', label: 'WhatsApp', value: `+${whatsapp}`, href: `https://wa.me/${whatsapp}` },
    { id: 'instagram', icon: 'instagram', label: 'Instagram', value: `@${instagram}`, href: `https://instagram.com/${instagram}` },
    { id: 'github', icon: 'github', label: 'GitHub', value: `github.com/${github}`, href: `https://github.com/${github}` },
    { id: 'location', icon: 'pin', label: 'Location', value: location },
  ]

  const update = field => event => {
    setForm(current => ({ ...current, [field]: event.target.value }))
    setSent(false)
  }

  const submit = event => {
    event.preventDefault()
    const subject = form.subject.trim() || `Portfolio message from ${form.name || 'a visitor'}`
    const body = `${form.message.trim()}\n\n— ${form.name || 'Visitor'}${form.email ? ` (${form.email})` : ''}`
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className="section" id="contact">
      <Reveal>
        <header className="section-intro">
          <div>
            <span className="section-eyebrow">Contact</span>
            <h2>Let&rsquo;s Work Together</h2>
          </div>
          <p>Get In Touch</p>
        </header>
      </Reveal>

      <div className="contact-layout">
        <Reveal>
          <div className="contact-panel">
            <h3>Tell me about your project.</h3>
            <p>
              I&rsquo;m currently available for freelance work and full-time opportunities. If you have a project
              that you want to get started, or need help with, feel free to reach out.
            </p>

            <ul className="contact-list">
              {details.map(item => (
                <li key={item.id}>
                  <span className="contact-icon" aria-hidden="true">{ICONS[item.icon]}</span>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer">{item.value}</a>
                  ) : (
                    <strong>{item.value}</strong>
                  )}
                </li>
              ))}
            </ul>

            <div className="contact-actions">
              <a href={`mailto:${email}`} className="btn btn-dark">Email me <span>→</span></a>
              <a href={`https://wa.me/${whatsapp}`} className="btn btn-light" target="_blank" rel="noreferrer">
                WhatsApp <span>↗</span>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <form className="contact-form" onSubmit={submit}>
            <div className="form-row">
              <label className="form-field">
                <span>Your Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Your Name"
                  required
                />
              </label>
              <label className="form-field">
                <span>Your Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="Your Email"
                  required
                />
              </label>
            </div>

            <label className="form-field">
              <span>Subject</span>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={update('subject')}
                placeholder="Subject"
              />
            </label>

            <label className="form-field">
              <span>Your Message</span>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={update('message')}
                placeholder="Your Message..."
                required
              ></textarea>
            </label>

            <button className="btn btn-primary form-send" type="submit">
              Send Message <span aria-hidden="true">→</span>
            </button>
            {sent && <p className="form-note">Your email app should have opened with the message ready to send.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
