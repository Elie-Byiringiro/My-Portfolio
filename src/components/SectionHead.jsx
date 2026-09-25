import Reveal from './Reveal'

export default function SectionHead({ tag, title, accent }) {
  return (
    <Reveal>
      <div className="section-head">
        <p className="section-tag">{tag}</p>
        <h2 className="section-title">
          {title} <span className="accent">{accent}</span>
        </h2>
      </div>
    </Reveal>
  )
}