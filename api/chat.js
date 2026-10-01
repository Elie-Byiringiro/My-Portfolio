import { fetchPortfolio } from './lib/supabase.js'
import { buildContext } from './lib/knowledge.js'

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini'
const MAX_HISTORY = 12

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) return res.status(503).json({ error: 'Assistant is not configured' })

  const { messages = [] } = req.body || {}
  const history = Array.isArray(messages)
    ? messages
        .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
        .slice(-MAX_HISTORY)
        .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }))
    : []

  if (!history.length) return res.status(400).json({ error: 'No messages supplied' })

  try {
    const portfolio = await fetchPortfolio()
    const { prompt } = buildContext(portfolio)

    const upstream = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'https://elie.dev',
        'X-Title': 'Byiringiro Elie Portfolio',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'system', content: prompt }, ...history],
      }),
    })

    if (!upstream.ok) {
      const detail = await upstream.text()
      console.error('OpenRouter error', upstream.status, detail)
      return res.status(502).json({ error: 'Assistant upstream failed' })
    }

    const data = await upstream.json()
    const reply = data?.choices?.[0]?.message?.content?.trim()
    if (!reply) return res.status(502).json({ error: 'Assistant returned an empty reply' })

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('chat handler failed', error)
    return res.status(500).json({ error: 'Assistant unavailable' })
  }
}