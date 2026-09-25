import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL || ''
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = url && anonKey ? createClient(url, anonKey) : null

export async function fetchRows(table, orderBy = 'sort_order') {
  if (!supabase) return null

  const query = supabase.from(table).select('*')
  const { data, error } = orderBy ? await query.order(orderBy) : await query.limit(1)
  if (error) throw error
  return orderBy ? data : data?.[0] || null
}
