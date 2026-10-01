import { fallbackProfile } from './fallbackData'

const handle = value => String(value || '').replace(/^@/, '').trim()

export const socialLinks = [
  {
    id: 'email',
    icon: 'mail',
    label: 'Email',
    value: fallbackProfile.email,
    href: `mailto:${fallbackProfile.email}`,
    external: false,
  },
  {
    id: 'whatsapp',
    icon: 'whatsapp',
    label: 'WhatsApp',
    value: fallbackProfile.whatsapp,
    href: `https://wa.me/${handle(fallbackProfile.whatsapp)}`,
    external: true,
  },
  {
    id: 'instagram',
    icon: 'instagram',
    label: 'Instagram',
    value: `@${handle(fallbackProfile.instagram)}`,
    href: `https://instagram.com/${handle(fallbackProfile.instagram)}`,
    external: true,
  },
  {
    id: 'github',
    icon: 'github',
    label: 'GitHub',
    value: `github.com/${handle(fallbackProfile.github)}`,
    href: `https://github.com/${handle(fallbackProfile.github)}`,
    external: true,
  },
]

export const socialLinkById = id => socialLinks.find(link => link.id === id) || null