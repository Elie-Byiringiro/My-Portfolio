import Reveal from './Reveal'
import { usePortfolioData } from '../lib/usePortfolioData'
import { fallbackTestimonials } from '../lib/fallbackData'

function Stars({ rating = 5 }) {
  return (
    <span className="testimonial-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? 'star-on' : 'star-off'} aria-hidden="true">★</span>
      ))}
    </span>
  )
}

export default function Testimonials() {
  const { data: testimonials } = usePortfolioData('testimonials', fallbackTestimonials)

  return (
    <section className="section" id="testimonials">
      <Reveal>
        <header className="section-intro">
          <div>
            <span className="section-eyebrow">Testimonials</span>
            <h2>What Clients Say</h2>
          </div>
          <p>Feedback from the people and teams I have worked with.</p>
        </header>
      </Reveal>

      <div className="testimonials-grid">
        {testimonials.map(item => (
          <Reveal key={item.id || item.name}>
            <figure className="testimonial-card">
              <Stars rating={item.rating || 5} />
              <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
              <figcaption>
                <span className="testimonial-avatar" aria-hidden="true">{item.name.charAt(0)}</span>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
