import { useEffect, useState } from 'react'
import { api } from './adminApi'
import type { SiteLink } from '../types'

export default function Links() {
  const [links, setLinks] = useState<SiteLink[]>([])
  const [urls, setUrls] = useState<Record<number, string>>({})
  const [saved, setSaved] = useState<number | null>(null)

  useEffect(() => {
    api.links().then(ls => { setLinks(ls); setUrls(Object.fromEntries(ls.map(l => [l.id, l.url || '']))) })
  }, [])

  const save = async (l: SiteLink) => {
    await api.updateLink(l.id, { url: urls[l.id] })
    setSaved(l.id)
    setTimeout(() => setSaved(null), 1500)
  }

  return (
    <>
      <h2 style={{ margin: '0 0 16px' }}>Ссылки группы</h2>
      <p style={{ color: '#9a9aa2' }}>Оставь пустой — кнопка на сайте поведёт в блок треков.</p>
      {links.map(l => (
        <div className="acard" key={l.id}>
          <div className="arow" style={{ gridTemplateColumns: '140px 1fr auto' }}>
            <div style={{ fontWeight: 700 }}>{l.label || l.keyName}</div>
            <label className="afield" style={{ gap: 4 }}>
              <span style={{ fontSize: 12, color: '#666' }}>{l.keyName}</span>
              <input value={urls[l.id] ?? ''} onChange={e => setUrls(u => ({ ...u, [l.id]: e.target.value }))} placeholder="https://…" />
            </label>
            <button className="abtn" onClick={() => save(l)}>{saved === l.id ? '✓' : 'Сохранить'}</button>
          </div>
        </div>
      ))}
    </>
  )
}
