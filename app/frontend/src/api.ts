import { FALLBACK } from './fallback'
import type { Site } from './types'

export async function loadSite(): Promise<{ site: Site; live: boolean }> {
  try {
    const r = await fetch('/api/public/site')
    if (!r.ok) throw new Error(String(r.status))
    const d = await r.json()
    if (!Array.isArray(d.tracks)) throw new Error('bad payload')
    return { site: d as Site, live: true }
  } catch {
    return { site: FALLBACK, live: false }
  }
}

export async function sendMessage(name: string, replyTo: string, body: string): Promise<boolean> {
  const r = await fetch('/api/public/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, replyTo, body })
  })
  return r.status === 204
}

export function linkFor(site: Site, key: string): string {
  return site.links.find(l => l.keyName === key)?.url || ''
}
