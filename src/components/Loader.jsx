import { useEffect, useState } from 'react'

export default function Loader() {
  const [gone, setGone] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    document.body.classList.add('loading')
    const fadeTimer = setTimeout(() => {
      setGone(true)
      document.body.classList.remove('loading')
    }, 700)
    const removeTimer = setTimeout(() => setRemoved(true), 1100)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
      document.body.classList.remove('loading')
    }
  }, [])

  if (removed) return null

  return (
    <div className={`loader${gone ? ' fade' : ''}`} aria-hidden="true">
      <div className="loader-content">
        <span className="loader-mark">[M4STER]</span>
        <span className="loader-line"><span></span></span>
      </div>
    </div>
  )
}
