import type { CSSProperties } from 'react'

export function s(css: string): CSSProperties {
  const out: Record<string, string> = {}
  for (const decl of css.split(';')) {
    const idx = decl.indexOf(':')
    if (idx < 0) continue
    const prop = decl.slice(0, idx).trim()
    const val = decl.slice(idx + 1).trim()
    if (!prop) continue
    const key = prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    out[key] = val
  }
  return out as CSSProperties
}

export function yaSrc(u?: string | null): string {
  if (!u) return ''
  let m = u.match(/album\/(\d+)\/track\/(\d+)/)
  if (m) return `https://music.yandex.ru/iframe/#track/${m[2]}/${m[1]}`
  m = u.match(/iframe\/#?track\/(\d+)\/(\d+)/)
  if (m) return `https://music.yandex.ru/iframe/#track/${m[1]}/${m[2]}`
  return ''
}
