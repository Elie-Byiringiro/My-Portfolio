const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''
const key = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''

const heads = { apikey: key, Authorization: `Bearer ${key}` }

export async function fetchTable(table, orderBy = 'sort_order') {
  if (!url || !key) return null
  try {
    const order = orderBy ? `&order=${orderBy}.asc` : '&limit=1'
    const res = await fetch(`${url}/rest/v1/${table}?select=*${order}`, { headers: heads })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function fetchPortfolio() {
  const [profile, stats, experience, skills, projects, posts, testimonials, focus] = await Promise.all([
    fetchTable('profile', null),
    fetchTable('stats'),
    fetchTable('experience'),
    fetchTable('skills'),
    fetchTable('projects'),
    fetchTable('posts'),
    fetchTable('testimonials'),
    fetchTable('focus'),
  ])
  return { profile, stats, experience, skills, projects, posts, testimonials, focus }
}