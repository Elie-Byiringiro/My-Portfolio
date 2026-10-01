const BRAND_BG = {
  javascript: '#f7df1e',
  typescript: '#3178c6',
  html: '#e34f26',
  css: '#1572b6',
  react: '#00bcd4',
  vite: '#a259ff',
  tailwind: '#0ea5a4',
  node: '#5fa04e',
  express: '#9ca3af',
  git: '#e2574c',
  rest: '#3a7bd5',
  api: '#0f766e',
  mongodb: '#13aa52',
  docker: '#2496ed',
  nginx: '#009639',
  linux: '#fcc624',
  cicd: '#f05032',
  ssl: '#0b8f5a',
  shield: '#c4514a',
  monitor: '#3a7bd5',
  server: '#6b7280',
  design: '#9333ea',
}

// Order matters: the first match wins, so more specific patterns come first.
const RULES = [
  [/javascript/i, 'javascript'],
  [/typescript/i, 'typescript'],
  [/html/i, 'html'],
  [/tailwind/i, 'tailwind'],
  [/\bcss\b/i, 'css'],
  [/\breact\b/i, 'react'],
  [/\bvite\b/i, 'vite'],
  [/node/i, 'node'],
  [/express/i, 'express'],
  [/git|github/i, 'git'],
  [/mongo/i, 'mongodb'],
  [/docker/i, 'docker'],
  [/nginx/i, 'nginx'],
  [/linux|\bvps\b|\bserver\b/i, 'linux'],
  [/ci\/?cd|pipeline/i, 'cicd'],
  [/ssl|dns|domain/i, 'ssl'],
  [/pen\s*test|penetration/i, 'pen'],
  [/access control|auth/i, 'shield'],
  [/security/i, 'shield'],
  [/\brest\b/i, 'rest'],
  [/\bapi\b|integration/i, 'api'],
  [/dentrix/i, 'dentist'],
  [/e-?commerce|store|shop|cart/i, 'ecommerce'],
  [/hosting|cloud|deploy/i, 'hosting'],
  [/responsive|design|\bui\b|\bux\b/i, 'design'],
  [/accessib/i, 'accessibility'],
  [/perform|speed|pagespeed/i, 'performance'],
  [/learn|grow/i, 'learning'],
  [/architect/i, 'architecture'],
  [/monitor/i, 'monitor'],
  [/backup/i, 'backup'],
  [/network/i, 'network'],
]

export function iconKeyFor(label) {
  const text = String(label || '')
  for (const [pattern, key] of RULES) {
    if (pattern.test(text)) return key
  }
  return 'code'
}

export function techIconTint(label) {
  return BRAND_BG[iconKeyFor(label)] || null
}