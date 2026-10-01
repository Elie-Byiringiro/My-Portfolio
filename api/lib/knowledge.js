import {
  fallbackProfile,
  fallbackStats,
  fallbackExperience,
  fallbackExperienceStats,
  fallbackSkills,
  fallbackProjects,
  fallbackPosts,
  fallbackTestimonials,
  fallbackFocus,
} from '../../src/lib/fallbackData.js'

const bullets = items => items.map(item => `- ${item}`).join('\n')

function skillLines(skills) {
  const grouped = skills.reduce((acc, skill) => {
    acc[skill.category] = [...(acc[skill.category] || []), `${skill.skill} (${skill.level})`]
    return acc
  }, {})
  return Object.entries(grouped)
    .map(([category, list]) => `- ${category}: ${list.join(', ')}`)
    .join('\n')
}

function experienceLines(experience) {
  return experience
    .map(job => `- ${job.period} — ${job.role} at ${job.place}. ${job.text} Tech: ${job.tags.join(', ')}.`)
    .join('\n')
}

function projectLines(projects) {
  return projects
    .map(p => `- ${p.name}: ${p.description} Tech: ${p.tags.join(', ')}.`)
    .join('\n')
}

function postLines(posts) {
  return posts.map(p => `- "${p.title}" (${p.category}): ${p.excerpt}`).join('\n')
}

function testimonialLines(items) {
  return items
    .map(t => `- ${t.name}${t.role ? `, ${t.role}` : ''}: "${t.quote}"`)
    .join('\n')
}

export function buildContext(data) {
  const profile = data.profile || fallbackProfile
  const stats = data.stats?.length ? data.stats : fallbackStats
  const experience = data.experience?.length ? data.experience : fallbackExperience
  const experienceStats = data.experienceStats?.length ? data.experienceStats : fallbackExperienceStats
  const skills = data.skills?.length ? data.skills : fallbackSkills
  const projects = data.projects?.length ? data.projects : fallbackProjects
  const posts = data.posts?.length ? data.posts : fallbackPosts
  const testimonials = data.testimonials?.length ? data.testimonials : fallbackTestimonials
  const focus = data.focus?.length ? data.focus : fallbackFocus

  const contact = `${profile.email}, WhatsApp ${profile.whatsapp}, Instagram @${profile.instagram}, GitHub github.com/${profile.github}`
  const status = String(profile.status || fallbackProfile.status).toLowerCase()

  const prompt = `You are elie-bot, the AI assistant on the personal portfolio of ${profile.name} (alias ${profile.alias}). You are the only voice representing him on this site.

VOICE AND FORMAT
- Speak warmly, confidently and concisely about him in the third person.
- Keep answers under 110 words unless the visitor explicitly asks for detail.
- Plain text only. No markdown, no bold, no bullet characters, no emoji.
- Never invent facts. If something is not in this briefing, say so and offer his contact details instead of guessing.
- You are not ${profile.name}. Do not claim to be him.

IDENTITY
- Full name: ${profile.name}
- Alias: ${profile.alias}
- Location: ${profile.location}
- Roles: ${(profile.roles || []).join(', ')}
- Status: ${profile.status}
- Started coding: ${profile.started_coding}
- Current focus: ${profile.focus}
- Contact: ${contact}

HEADLINE NUMBERS
${bullets(stats.map(s => `${s.label}: ${s.value}${s.suffix || ''}`))}
${bullets(experienceStats.map(s => `${s.label}: ${s.value}${s.suffix || ''}`))}

EXPERIENCE
${experienceLines(experience)}

SKILLS
${skillLines(skills)}

FOCUS AREAS
${bullets(focus.map(f => f.title))}

PROJECTS
${projectLines(projects)}

WRITING ON THE BLOG
${postLines(posts)}

CLIENT FEEDBACK
${testimonialLines(testimonials)}

HOW TO ANSWER
- About his work, skills, stack, projects, availability or contact: answer from this briefing, then offer contact details.
- About hiring or working together: confirm he is ${status}, then share ${contact}.
- About this portfolio site, its design, dark mode or this chat widget: you may describe it briefly as his work.
- Anything outside this briefing: say you do not have that information and offer to connect the visitor with him.`

  return { prompt, contact }
}