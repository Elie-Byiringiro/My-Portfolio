const GITHUB_PATH =
  'M9 19c-4 1.2-4-2.2-5.5-2.7M15 21v-3.4a3 3 0 0 0-.8-2.3c2.6-.3 5.3-1.3 5.3-5.8a4.5 4.5 0 0 0-1.2-3.1 4.2 4.2 0 0 0-.1-3.1s-1-.3-3.3 1.2a11 11 0 0 0-5.8 0C6.8 3 5.8 3.3 5.8 3.3a4.2 4.2 0 0 0-.1 3.1A4.5 4.5 0 0 0 4.5 9.5c0 4.5 2.7 5.5 5.3 5.8a3 3 0 0 0-.8 2.2V21'

const SHIELD_PATH = 'M12 3 5 6v5c0 4.6 2.9 8.2 7 10 4.1-1.8 7-5.4 7-10V6l-7-3Z'

const PATHS = {
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M5 3.5h3.5l1.8 4.2-2.2 1.4a12 12 0 0 0 5.3 5.3l1.4-2.2 4.2 1.8V18a2.5 2.5 0 0 1-2.7 2.5A16.5 16.5 0 0 1 2.5 6.2 2.5 2.5 0 0 1 5 3.5Z" />
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5 5 16.4A8 8 0 1 1 8 19.2l-4.5 1.3Z" />
      <path d="M9 9.2c0 3 2.4 5.4 5.4 5.4.5 0 .9-.4.9-.9v-.7l-1.6-.5-.8 1a5.6 5.6 0 0 1-2.1-2.1l1-.8L11.3 8h-.7c-.5 0-.6.5-.6 1.2Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" className="icon-dot" />
    </>
  ),
  github: <path d={GITHUB_PATH} />,
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  code: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3" />
      <path d="M12 15h5" />
    </>
  ),
  terminal: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="m7 10 2.5 2.5L7 15M12.5 15H17" />
    </>
  ),
  shield: (
    <>
      <path d={SHIELD_PATH} />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  api: (
    <>
      <circle cx="5" cy="12" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="m7 11 10-4M7 13l10 4" />
    </>
  ),
  host: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  deploy: (
    <>
      <path d="M12 3v11" />
      <path d="m8 10 4 4 4-4" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </>
  ),
  monitor: (
    <>
      <path d="M3 13h4l2.5-7 4 14L16 13h5" />
      <path d="M4 20h16" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  cloud: (
    <path d="M7 18h10a4 4 0 0 0 .6-8 5.5 5.5 0 0 0-10.5 1.5A3.5 3.5 0 0 0 7 18Z" />
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5M3 17l9 5 9-5" />
    </>
  ),
  brush: (
    <>
      <path d="M4 20s1-4 4-4 3 2 6 2 4-2 4-2" />
      <path d="M9.5 16.5 19 7a2 2 0 0 0-2.8-2.8L6.7 13.7" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12h18" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3c3.5 1.8 5.5 5 5.5 9L14 15h-4l-3.5-3c0-4 2-7.2 5.5-9Z" />
      <path d="M9.5 12.5 6 16v3.5l3-1M14.5 12.5 18 16v3.5l-3-1" />
    </>
  ),
  database_brand: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
    </>
  ),
  container: (
    <>
      <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </>
  ),
  linux: (
    <>
      <path d="M12 3c-2 0-2.8 1.8-2.6 3.6.2 1.6-.4 2.4-1.2 3.6-1 1.5-1.4 3.2-1.2 4.8A5.9 5.9 0 0 0 12 20a5 5 0 0 0 5-5c.2-1.6-.2-3.3-1.2-4.8-.8-1.2-1.4-2-1.2-3.6C14.8 4.8 14 3 12 3Z" />
      <path d="M9.5 11.5h.01M14.5 11.5h.01M10.5 15.5c1 .8 2 .8 3 0" />
    </>
  ),
  cogs: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M21 12h-2.5M5.5 12H3M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </>
  ),
  moon: (
    <path d="M20 14.2A8.4 8.4 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
  ),
  chat: (
    <path d="M20 12.5c0 3.9-3.6 7-8 7-1 0-2-.2-2.9-.5L4 20.5l1.6-3.8A6.7 6.7 0 0 1 4 12.5c0-3.9 3.6-7 8-7s8 3.1 8 7Z" />
  ),
  close: (
    <path d="m6.5 6.5 11 11M17.5 6.5l-11 11" />
  ),
  arrowUp: <path d="M12 19V6M6.5 11.5 12 6l5.5 5.5" />,
  external: (
    <>
      <path d="M14 4h6v6M20 4l-8.5 8.5" />
      <path d="M18 14.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V7.5A1.5 1.5 0 0 1 5 6h4.5" />
    </>
  ),
  send: (
    <>
      <path d="M21 3 10.5 13.5" />
      <path d="M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z" />
    </>
  ),
}

export default function Icon({ name, className }) {
  const glyph = PATHS[name]
  if (!glyph) return null
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      {glyph}
    </svg>
  )
}
