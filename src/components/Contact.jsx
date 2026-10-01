import { useState } from 'react'
import Reveal from './Reveal'
import Icon from './Icons'
import { usePortfolioData } from '../lib/usePortfolioData'
import { fallbackProfile } from '../lib/fallbackData'

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const { data: profile } = usePortfolioData('profile', fallbackProfile)
  const [form, setForm] = useState(EMPTY_FORM)
  const [sent, setSent] = useState(false)

  const email = profile?.email || 'byiringiroelie468@gmail.com'
  const whatsapp = String(profile?.whatsapp || '0783547443').replace(/\s/g, '')
  const instagram = String(profile?.instagram || 'elie___001').replace(/^@/, '')
  const github = String(profile?.github || 'elie').replace(/^@/, '')
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
          <p>Have an API to build or a platform to host? Get in touch.</p>
        </header>
      </Reveal>

      <div className="contact-layout">
        <Reveal>
          <div className="contact-panel">
            <h3>Tell me about your project.</h3>
            <p>
              I&rsquo;m currently available for freelance work and full-time opportunities. Need a secure API
              built, a platform hosted and deployed, or an existing system maintained and monitored? Tell me what
              you&rsquo;re trying to run and I&rsquo;ll reply with an approach.
            </p>

            <ul className="contact-list">
              {details.map(item => (
                <li key={item.id}>
                  <span className="contact-icon" aria-hidden="true"><Icon name={item.icon} /></span>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer">{item.value}</a>
                  ) : (
                    <strong>{item.value}</strong>
                  )}
                </li>
              ))}
            </ul>

            <div className="contact-actions">
              <a href={`mailto:${email}`} className="btn btn-dark">
                <Icon name="mail" /> Email me <span>→</span>
              </a>
              <a href={`https://wa.me/${whatsapp}`} className="btn btn-light" target="_blank" rel="noreferrer">
                <Icon name="whatsapp" /> WhatsApp <span>↗</span>
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
              <Icon name="send" /> Send Message <span aria-hidden="true">→</span>
            </button>
            {sent && <p className="form-note">Your email app should have opened with the message ready to send.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
