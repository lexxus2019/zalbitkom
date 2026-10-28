import type { Message, SiteLink, Track } from '../types'

const TOKEN_KEY = 'zalbit-token'

export function getToken() { return localStorage.getItem(TOKEN_KEY) || '' }
export function setToken(t: string) { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY) }

async function req<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = { ...(init.headers as Record<string, string>) }
  const tok = getToken()
  if (tok) headers.Authorization = 'Bearer ' + tok
  const r = await fetch(path, { ...init, headers })
  if (r.status === 401) { setToken(''); throw new Error('unauthorized') }
  if (!r.ok) throw new Error(await r.text() || String(r.status))
  if (r.status === 204) return undefined as T
  const ct = r.headers.get('content-type') || ''
  return (ct.includes('json') ? r.json() : undefined) as T
}

export const api = {
  login: async (username: string, password: string) => {
    const r = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (!r.ok) throw new Error('неверный логин или пароль')
    const d = await r.json()
    setToken(d.token)
  },
  logout: () => setToken(''),
  tracks: () => req<Track[]>('/api/admin/tracks'),
  createTrack: (t: Partial<Track>) => req<Track>('/api/admin/tracks', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(t)
  }),
  updateTrack: (id: number, t: Partial<Track>) => req<Track>(`/api/admin/tracks/${id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(t)
  }),
  deleteTrack: (id: number) => req<void>(`/api/admin/tracks/${id}`, { method: 'DELETE' }),
  links: () => req<SiteLink[]>('/api/admin/links'),
  updateLink: (id: number, l: Partial<SiteLink>) => req<SiteLink>(`/api/admin/links/${id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(l)
  }),
  messages: () => req<Message[]>('/api/admin/messages'),
  setMessageStatus: (id: number, status: string) =>
    req<Message>(`/api/admin/messages/${id}/status?status=${status}`, { method: 'PUT' }),
  deleteMessage: (id: number) => req<void>(`/api/admin/messages/${id}`, { method: 'DELETE' }),
  upload: async (file: File): Promise<string> => {
    const fd = new FormData()
    fd.append('file', file)
    const d = await req<{ url: string }>('/api/admin/media', { method: 'POST', body: fd })
    return d.url
  }
}
