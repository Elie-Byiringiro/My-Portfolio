import { useEffect, useRef, useState } from 'react'

const API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'openai/gpt-4o'
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || ''

const SUGGESTIONS = [
  'What can you build?',
  'What are your best projects?',
  'What is your tech stack?',
  'How can I hire you?',
]

const SYSTEM_PROMPT = `You are elie-bot, the assistant on Byiringiro Elie's portfolio.
Speak warmly and confidently about Elie in the third person, and keep every answer under 110 words.
Use plain text without markdown. Here is accurate information about Elie:

- Full name: Byiringiro Elie
- Alias: M4STER
- Location: Kigali, Rwanda
- Roles: Full-Stack Developer, Cybersecurity Analyst, API Architect
- Contact: byiringiroelie468@gmail.com, WhatsApp 0783547443, Instagram @elie__001, GitHub github.com/elie
- Status: Available for new opportunities
- Experience: 3+ years (2 years cybersecurity analysis, 1+ year frontend development), 6+ projects built, 95+ PageSpeed score
- Focus: production-ready systems, secure APIs, dashboards, authentication flows, database architecture, penetration testing, real-time applications, CI/CD pipelines
- Stack: JavaScript, TypeScript, HTML5, CSS3, React, Vite, Tailwind CSS, Node.js, Express, MongoDB, REST APIs, C#, Git
- Featured projects:
  1. E-commerce — authentication, product management, cart and secure payments

Note: only the e-commerce platform is listed publicly. Other work is discussed on request.`

const KNOWLEDGE_BASE = {
  intro: "I'm elie-bot. Byiringiro Elie, also known as M4STER, is a full-stack developer and cybersecurity analyst based in Kigali, Rwanda.",
  projects:
    'His featured project is a full e-commerce website with authentication, product management, cart and secure payments, built with React, Node.js and MongoDB.',
  skills: 'His stack includes JavaScript, TypeScript, HTML5, CSS3, React, Vite, Tailwind CSS, Node.js, Express, MongoDB, REST APIs, C# and Git. He also works on penetration testing, API security and access control.',
  stats: 'Elie has 3+ years of experience, has built 6+ projects, and maintains a 95+ PageSpeed score.',
  status: 'available for new opportunities and freelance projects',
  contact: 'byiringiroelie468@gmail.com, WhatsApp 0783547443, Instagram @elie__001, or GitHub github.com/elie',
}

const RULES = [
  { keys: ['hi', 'hello', 'hey', 'howdy', 'good morning', 'good afternoon', 'good evening'], reply: "Hello! I'm elie-bot. Ask me about Elie's work, skills, projects, or how to get in touch." },
  { keys: ['who is elie', 'who are you', 'what are you', 'your name', 'about elie', 'about yourself', 'tell me about', 'm4ster'], reply: `${KNOWLEDGE_BASE.intro} He's currently ${KNOWLEDGE_BASE.status}.` },
  { keys: ['what can you do', 'can you do', 'help me', 'what do you do'], reply: `I can tell you about Elie's background, projects, skills, and availability. ${KNOWLEDGE_BASE.intro}` },
  { keys: ['how long', 'experience', 'years', 'stats', 'pagespeed', 'started', 'based', 'location', 'where', 'kigali', 'rwanda', 'developer', 'role', 'job title'], reply: `${KNOWLEDGE_BASE.stats} He is based in Kigali, Rwanda.` },
  { keys: ['project', 'portfolio', 'built', 'build', 'what have you made', 'best work', 'e-commerce', 'ecommerce', 'shop', 'store', 'cart', 'apps', 'websites'], reply: KNOWLEDGE_BASE.projects },
  { keys: ['skill', 'tech stack', 'stack', 'language', 'framework', 'react', 'javascript', 'typescript', 'node', 'express', 'html', 'css', 'tailwind', 'vite', 'tools', 'security', 'penetration', 'api'], reply: KNOWLEDGE_BASE.skills },
  { keys: ['hire', 'contact', 'email', 'reach', 'freelance', 'available', 'open to work', 'recruiter', 'job', 'offer', 'work with', 'get in touch', 'talk to', 'whatsapp', 'instagram'], reply: `Elie is ${KNOWLEDGE_BASE.status}. You can reach him at ${KNOWLEDGE_BASE.contact}.` },
  { keys: ['elie'], reply: KNOWLEDGE_BASE.intro },
]

function answerAboutMe(question) {
  const text = question.toLowerCase()
  for (const rule of RULES) {
    if (rule.keys.some(key => text.includes(key))) return rule.reply
  }
  return null
}

const TYPING_RESPONSES = ['thinking', 'checking my notes', 'preparing an answer']

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [busy, setBusy] = useState(false)
  const [typingLabel, setTypingLabel] = useState(TYPING_RESPONSES[0])
  const bodyRef = useRef(null)
  const messagesRef = useRef(messages)

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  useEffect(() => {
    const openChat = () => setOpen(true)
    window.addEventListener('open-elie-chat', openChat)
    return () => window.removeEventListener('open-elie-chat', openChat)
  }, [])

  useEffect(() => {
    if (!busy) return
    const id = setInterval(() => {
      setTypingLabel(TYPING_RESPONSES[Math.floor(Math.random() * TYPING_RESPONSES.length)])
    }, 1200)
    return () => clearInterval(id)
  }, [busy])

  useEffect(() => {
    const element = bodyRef.current
    if (element) element.scrollTop = element.scrollHeight
  }, [messages, busy, open])

  const send = async (text = input) => {
    const prompt = text.trim()
    if (!prompt || busy) return

    setMessages(current => [...current, { from: 'user', text: prompt }])
    setInput('')

    const localReply = answerAboutMe(prompt)
    if (localReply) {
      setMessages(current => [...current, { from: 'bot', text: localReply }])
      return
    }

    if (!API_KEY) {
      setMessages(current => [
        ...current,
        { from: 'error', text: `I can answer questions about Elie's work, skills and contact details. For anything else, reach him at ${KNOWLEDGE_BASE.contact}.` },
      ])
      return
    }

    setBusy(true)
    const history = messagesRef.current
      .filter(message => message.from === 'user' || message.from === 'bot')
      .map(message => ({ role: message.from, content: message.text }))

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin && window.location.origin !== 'null' ? window.location.origin : 'https://elie.dev',
          'X-Title': 'Byiringiro Elie Portfolio',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history, { role: 'user', content: prompt }],
        }),
      })

      if (!response.ok) throw new Error(`API ${response.status}`)
      const data = await response.json()
      const reply = data?.choices?.[0]?.message?.content?.trim()
      if (!reply) throw new Error('empty response')
      setMessages(current => [...current, { from: 'bot', text: reply }])
    } catch {
      setMessages(current => [
        ...current,
        { from: 'error', text: `I couldn't reach the live assistant right now. You can contact Elie at ${KNOWLEDGE_BASE.contact}.` },
      ])
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className={`chat-widget${open ? ' open' : ''}`} aria-hidden={!open} inert={!open}>
        <div className="chat-panel">
          <div className="chat-head">
            <span className="chat-avatar">M</span>
            <span className="chat-title">Ask elie-bot</span>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {messages.length === 0 && !busy && (
              <div className="chat-welcome">
                <p className="chat-hello">Hi! Ask me about Elie's skills, projects, or how to work with him.</p>
                <div className="chat-suggestions">
                  {SUGGESTIONS.map(suggestion => (
                    <button key={suggestion} className="chat-chip" onClick={() => send(suggestion)}>{suggestion}</button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div key={index} className={`chat-msg ${message.from}`}>
                <span className="chat-who">{message.from === 'user' ? 'You' : message.from === 'error' ? 'Notice' : 'elie-bot'}</span>
                <p className="chat-text">{message.text}</p>
              </div>
            ))}
            {busy && (
              <div className="chat-msg bot">
                <span className="chat-who">elie-bot</span>
                <p className="chat-text typing">
                  <span className="typing-dots"></span>
                  <span className="typing-label">{typingLabel}</span>
                </p>
              </div>
            )}
          </div>

          <div className="chat-input-row">
            <input
              className="chat-input"
              value={input}
              onChange={event => setInput(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter') send()
              }}
              placeholder="Ask about Elie..."
              aria-label="Message elie-bot"
            />
            <button className="chat-send" onClick={() => send()} disabled={busy || !input.trim()} aria-label="Send message">→</button>
          </div>
        </div>
      </div>

      <button
        className={`chat-toggle${open ? ' open' : ''}`}
        onClick={() => setOpen(current => !current)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
      >
        {open ? 'Close' : 'Chat'}
      </button>
    </>
  )
}
