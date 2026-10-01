import { useEffect, useRef, useState } from 'react'
import Icon from './Icons'
import { KNOWLEDGE_BASE } from '../lib/elieKnowledge'

const ENDPOINT = '/api/chat'
const MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'openai/gpt-4o'
const CLIENT_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || ''

const SUGGESTIONS = [
  'Who is Elie?',
  'What can you build?',
  'What is your tech stack?',
  'How can I hire you?',
]

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

  const askDirectly = async (history, prompt) => {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CLIENT_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Byiringiro Elie Portfolio',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: 'You are elie-bot, the AI assistant on Byiringiro Elie (alias M4STER) portfolio. Speak in the third person about him, keep answers under 110 words, use plain text without markdown, and never invent facts. If you do not know something, say so and offer his contact details: byiringiroelie468@gmail.com, WhatsApp 0783547443.' },
          ...history,
          { role: 'user', content: prompt },
        ],
      }),
    })
    if (!res.ok) throw new Error(`OpenRouter ${res.status}`)
    const data = await res.json()
    const reply = data?.choices?.[0]?.message?.content?.trim()
    if (!reply) throw new Error('Empty reply')
    return reply
  }

  const send = async (text = input) => {
    const prompt = text.trim()
    if (!prompt || busy) return

    setMessages(current => [...current, { from: 'user', text: prompt }])
    setInput('')
    setBusy(true)

    const history = messagesRef.current
      .filter(message => message.from === 'user' || message.from === 'bot')
      .map(message => ({ role: message.from === 'user' ? 'user' : 'assistant', content: message.text }))

    try {
      let reply = null

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history, { role: 'user', content: prompt }] }),
      })

      if (res.ok) {
        const data = await res.json()
        reply = data?.reply || null
      }

      if (!reply && CLIENT_KEY) reply = await askDirectly(history, prompt)

      if (!reply) throw new Error('No reply')
      setMessages(current => [...current, { from: 'bot', text: reply }])
    } catch {
      setMessages(current => [
        ...current,
        { from: 'error', text: `I couldn't reach the assistant right now. You can contact Elie at ${KNOWLEDGE_BASE.contact}.` },
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
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
              <Icon name="close" />
            </button>
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
            <button className="chat-send" onClick={() => send()} disabled={busy || !input.trim()} aria-label="Send message">
              <Icon name="send" />
            </button>
          </div>
        </div>
      </div>

      <button
        className={`chat-toggle${open ? ' open' : ''}`}
        onClick={() => setOpen(current => !current)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        title={open ? 'Close assistant' : 'Ask elie-bot'}
      >
        <Icon name={open ? 'close' : 'chat'} />
      </button>
    </>
  )
}