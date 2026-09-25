import { useEffect, useState } from 'react'
import { fetchRows } from './supabase'

export function usePortfolioData(table, fallbackData) {
  const [data, setData] = useState(fallbackData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      try {
        const rows = await fetchRows(table)
        if (!cancelled && rows) setData(rows)
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [table])

  return { data, loading, error }
}