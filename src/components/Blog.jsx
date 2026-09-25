import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import { usePortfolioData } from '../lib/usePortfolioData'
import { fallbackPosts } from '../lib/fallbackData'

const FILTERS = [
  { value: 'all', label: 'All posts' },
  { value: 'article', label: 'Articles' },
  { value: 'write-up', label: 'Write-ups' },
  { value: 'guide', label: 'Guides' },
]

const getRequestedSlug = () => new URLSearchParams(window.location.search).get('post')

const getParagraphs = body => {
  if (Array.isArray(body)) return body.map(String).map(paragraph => paragraph.trim()).filter(Boolean)
  return String(body || '').split(/\n\s*\n/).map(paragraph => paragraph.trim()).filter(Boolean)
}

const getReadingTime = body => {
  const words = getParagraphs(body).join(' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

const formatDate = value => {
  if (!value) return 'draft'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

const formatCategory = value => String(value || 'article')
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('-')

const articleHref = slug => `?post=${encodeURIComponent(slug)}#post-${slug}`

export default function Blog() {
  const { data: posts } = usePortfolioData('posts', fallbackPosts)
  const [filter, setFilter] = useState('all')
  const [activeSlug, setActiveSlug] = useState(getRequestedSlug)
  const activePost = posts.find(post => post.slug === activeSlug)
  const visiblePosts = filter === 'all'
    ? posts
    : posts.filter(post => (post.category || 'article') === filter)

  useEffect(() => {
    const syncLocation = () => setActiveSlug(getRequestedSlug())
    window.addEventListener('popstate', syncLocation)
    return () => window.removeEventListener('popstate', syncLocation)
  }, [])

  useEffect(() => {
    const previousTitle = document.title
    if (activeSlug) {
      document.title = activePost
        ? `${activePost.title} | Byiringiro Elie`
        : 'Article not found | Byiringiro Elie'
    }
    return () => {
      document.title = previousTitle
    }
  }, [activePost, activeSlug])

  useEffect(() => {
    const targetId = window.location.hash.slice(1) || (activeSlug ? `post-${activeSlug}` : 'blog')
    const frame = requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [activeSlug, activePost])

  const openArticle = (event, slug) => {
    event.preventDefault()
    const url = new URL(window.location.href)
    url.searchParams.set('post', slug)
    url.hash = `post-${slug}`
    window.history.pushState({ post: slug }, '', url)
    setActiveSlug(slug)
  }

  const closeArticle = event => {
    event.preventDefault()
    const url = new URL(window.location.href)
    url.searchParams.delete('post')
    url.hash = 'blog'
    window.history.replaceState({}, '', url)
    setActiveSlug(null)
  }

  return (
    <section className="section" id="blog">
        <SectionHead tag="Writeups & articles" title="Technical notes," accent="CTF & dev insights" />

      <Reveal>
        <div className="blog-intro">
          <p>Technical writeups, CTF solutions, and dev insights from building and securing real products.</p>
          <span className="blog-note-count">Development · Security · Process</span>
        </div>
      </Reveal>

      {activeSlug && (
        <article
          className="post-reader"
          id={`post-${activeSlug}`}
          aria-labelledby={`post-title-${activeSlug}`}
        >
          <a className="post-back" href="#blog" onClick={closeArticle}>← Back to all articles</a>

          {activePost ? (
            <>
              <header className="post-reader-header">
                <p className="post-article-kicker">{formatCategory(activePost.category)} / {activePost.slug}</p>
                <h3 id={`post-title-${activeSlug}`}>{activePost.title}</h3>
                <p className="post-article-dek">{activePost.excerpt}</p>
                <div className="post-article-meta">
                  <time dateTime={activePost.published_at}>{formatDate(activePost.published_at)}</time>
                  <span>{getReadingTime(activePost.body)} min read</span>
                </div>
              </header>

              <div className="post-content">
                {getParagraphs(activePost.body).map((paragraph, index) => (
                  <p key={`${activePost.slug}-${index}`}>{paragraph}</p>
                ))}
              </div>

              <footer className="post-article-footer">
                <div className="post-tags">
                  {(Array.isArray(activePost.tags) ? activePost.tags : []).map(tag => <span key={tag}>{tag}</span>)}
                </div>
                <a href="#contact">Discuss this topic →</a>
              </footer>
            </>
          ) : (
            <div className="post-not-found">
              <p>404 / article not found</p>
              <h3 id={`post-title-${activeSlug}`}>That write-up is not here yet.</h3>
              <span>It may have moved, or the link may be incomplete.</span>
            </div>
          )}
        </article>
      )}

      <div className="blog-toolbar">
        <p><span>{visiblePosts.length}</span> published {visiblePosts.length === 1 ? 'post' : 'posts'}</p>
        <div className="blog-filters" aria-label="Filter blog posts">
          {FILTERS.map(item => (
            <button
              key={item.value}
              className={`blog-filter${filter === item.value ? ' active' : ''}`}
              type="button"
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {visiblePosts.length === 0 && (
        <div className="blog-empty">
          <span>404</span>
          <p>No posts are available in this collection yet.</p>
        </div>
      )}

      <div className="blog-grid">
        {visiblePosts.map((post, index) => {
          const tags = Array.isArray(post.tags) ? post.tags : []
          return (
            <Reveal key={post.id || post.slug}>
              <article className="post-card">
                <div className="post-card-head">
                  <span className="post-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="post-kind">{formatCategory(post.category)}</span>
                </div>
                <div className="post-card-body">
                  <div className="post-meta">
                    <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                    <span>{getReadingTime(post.body)} min read</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
                <div className="post-card-footer">
                  <div className="post-tags">
                    {tags.map(tag => <span key={tag}>{tag}</span>)}
                  </div>
                  <a
                    className="post-read"
                    href={articleHref(post.slug)}
                    onClick={event => openArticle(event, post.slug)}
                    aria-label={`Read ${post.title}`}
                  >
                    Read article <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
