import { iconKeyFor } from '../lib/techIcons'

function Mark({ label, tint }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="#fff" />
      <text
        x="12"
        y="12"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize={label.length > 2 ? 6.4 : 8}
        fontWeight="700"
        fill={tint}
      >
        {label}
      </text>
    </svg>
  )
}

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }

const GLYPHS = {
  javascript: () => <Mark label="JS" tint="#1d1d1a" />,
  typescript: () => <Mark label="TS" tint="#1d1d1a" />,
  html: () => <Mark label="<>" tint="#e34f26" />,
  css: () => <Mark label="#" tint="#1572b6" />,
  react: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <circle cx="12" cy="12" r="1.9" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
    </svg>
  ),
  vite: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="M4 8.5 9.5 3 12 5l2.5-2L20 8.5 10 19.5Z" />
      <path d="M9 8.8h5.2L11 13.5" />
    </svg>
  ),
  tailwind: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="M7.4 11.6c1.4-2.8 2.9-4.2 4.4-4.2 1.4 0 2.4.9 3 2.7 1.4-2.8 2.9-4.2 4.4-4.2 2.4 0 3.3 1.9 2.9 5.6-1.5 2.8-2.9 4.2-4.3 4.2-2.4 0-3.3-1.9-2.9-5.6-1.4 2.8-2.9 4.2-4.4 4.2-2.4 0-3.3-1.9-2.9-5.6" transform="translate(-.7 3.6) scale(.92)" />
    </svg>
  ),
  node: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="M12 2.7 20.1 7.3v9.4L12 21.3 3.9 16.7V7.3Z" />
      <path d="M9.4 15.2V9.6l3.1 2.7V9.1M15 9.1v3.4" />
    </svg>
  ),
  express: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="M17.5 9.4H7.2a3.6 3.6 0 1 0 3.3 4.7" />
      <path d="M13.4 14.1h4.3" />
    </svg>
  ),
  git: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <circle cx="7" cy="5.5" r="2.3" />
      <circle cx="7" cy="18.5" r="2.3" />
      <circle cx="17" cy="9.5" r="2.3" />
      <path d="M7 7.8v8.4M17 11.8c0 3.2-2.4 5.2-5.6 5.6" />
    </svg>
  ),
  rest: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <circle cx="5" cy="12" r="2.1" />
      <circle cx="19" cy="6.5" r="2.1" />
      <circle cx="19" cy="17.5" r="2.1" />
      <path d="m7 11 10-3.6M7 13l10 3.6" />
    </svg>
  ),
  api: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="m8.5 8.5-4 3.5 4 3.5M15.5 8.5l4 3.5-4 3.5M13.6 5.5l-3.2 13" />
    </svg>
  ),
  mongodb: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="M12 2.6c2.6 2.8 3.6 5.8 3.6 9.2 0 4-1.4 6.6-3.6 6.6s-3.6-2.6-3.6-6.6c0-3.4 1-6.4 3.6-9.2Z" />
      <path d="M12 2.6v16M8.6 10.4c1.6.9 5.2.9 6.8 0M8.8 13.6c1.5.8 4.9.8 6.4 0" />
    </svg>
  ),
  docker: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="M3 13.5h15.6c.9 0 1.6-.7 1.6-1.6v-.8c0-.9-.7-1.6-1.6-1.6H15.4V7.3c0-.9-.7-1.6-1.6-1.6h-2v3.2H9.4V6.6c0-.9-.7-1.6-1.6-1.6H5.9c-.9 0-1.6.7-1.6 1.6v3.3" />
      <path d="M3 13.5c0 3.6 2.8 6.3 6.6 6.3 5.5 0 9.2-3.4 10.2-7.7" />
    </svg>
  ),
  nginx: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="M12 2.7 20.1 7.3v9.4L12 21.3 3.9 16.7V7.3Z" />
      <path d="M9.6 15V9.2l3.4 3.2V9.2" />
    </svg>
  ),
  linux: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="M12 3c-2 0-2.8 1.8-2.6 3.6.2 1.6-.4 2.4-1.2 3.6-1 1.5-1.4 3.2-1.2 4.8A5.9 5.9 0 0 0 12 20a5 5 0 0 0 5-5c.2-1.6-.2-3.3-1.2-4.8-.8-1.2-1.4-2-1.2-3.6C14.8 4.8 14 3 12 3Z" />
      <path d="M9.5 11.5h.01M14.5 11.5h.01M10.5 15.5c1 .8 2 .8 3 0" />
    </svg>
  ),
  cicd: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <circle cx="6.5" cy="18" r="2.3" />
      <circle cx="6.5" cy="6" r="2.3" />
      <circle cx="17.5" cy="12" r="2.3" />
      <path d="M6.5 8.3v7.4M8.8 6.9c4.3 0 6.4.6 6.4 3.3M15.4 13.5c-1.5 1.6-3.3 2.3-5.6 2.3" />
    </svg>
  ),
  ssl: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <rect x="4.5" y="10" width="15" height="10" rx="2.2" />
      <path d="M8 10V7.6a4 4 0 0 1 8 0V10M12 14v2.4" />
    </svg>
  ),
  shield: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="M12 3 5 6v5c0 4.6 2.9 8.2 7 10 4.1-1.8 7-5.4 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  pen: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="M12 3 5 6v5c0 4.6 2.9 8.2 7 10 4.1-1.8 7-5.4 7-10V6l-7-3Z" />
      <path d="M12 8v6M9 11h6" />
    </svg>
  ),
  monitor: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="M3 13h4l2.5-7 4 14L16 13h5M4 20h16" />
    </svg>
  ),
  server: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  ),
  design: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <rect x="3" y="3.5" width="18" height="17" rx="2.5" />
      <path d="M3 8.5h18M8.5 8.5V20.5" />
    </svg>
  ),
  accessibility: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <circle cx="12" cy="4.6" r="1.8" />
      <path d="M5 8.4h14M12 8.4v5M9 20.5l3-7.1 3 7.1" />
    </svg>
  ),
  performance: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="M13 2.6 4.6 13.4h5.8L11 21.4l8.4-10.8h-5.8Z" />
    </svg>
  ),
  learning: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="M3 7.2 12 3.4l9 3.8-9 3.8Z" />
      <path d="M6.6 9.4v5.2c0 1.9 2.4 3.4 5.4 3.4s5.4-1.5 5.4-3.4V9.4" />
    </svg>
  ),
  architecture: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5M3 17l9 5 9-5" />
    </svg>
  ),
  dentist: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="M12 4.4c1.7-1.4 4.2-1.2 5.6.4 1.7 2 1.4 5.2.4 7.6-.6 1.5-.9 3-1.3 4.6-.3 1.2-.6 2.4-1.5 2.4-1 0-1.2-1.2-1.5-2.6l-.4-1.8h-2.6l-.4 1.8c-.3 1.4-.5 2.6-1.5 2.6-.9 0-1.2-1.2-1.5-2.4-.4-1.6-.7-3.1-1.3-4.6-1-2.4-1.3-5.6.4-7.6 1.4-1.6 3.9-1.8 5.6-.4Z" />
      <path d="M12 4.4v6.4" />
    </svg>
  ),
  hosting: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="M7 18h10a4 4 0 0 0 .6-8 5.5 5.5 0 0 0-10.5 1.5A3.5 3.5 0 0 0 7 18Z" />
      <path d="M12 18v3.4M9.4 21.4h5.2" />
    </svg>
  ),
  ecommerce: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <path d="M3.4 4.5h2.3l2.2 10.2h9.4" />
      <path d="M8.6 8.2h11.8l-1.6 5.6H9.6" />
      <circle cx="10" cy="19" r="1.6" />
      <circle cx="17.4" cy="19" r="1.6" />
    </svg>
  ),
  code: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M12 15h5" />
    </svg>
  ),
}

export default function TechIcon({ label }) {
  const Glyph = GLYPHS[iconKeyFor(label)] || GLYPHS.code
  return <Glyph />
}