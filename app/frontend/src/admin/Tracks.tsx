import { useEffect, useState } from 'react'
import { api } from './adminApi'
import type { Track } from '../types'

const EMPTY: Partial<Track> = { title: '', line: '', tag: '', isNew: false, yandexUrl: '', mp3Url: '', clipUrl: '', coverUrl: '', sortOrder: 0 }

export default function Tracks() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [editing, setEditing] = useState<Partial<Track> | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const reload = () => api.tracks().then(setTracks).catch(e => setError(String(e)))
  useEffect(() => { reload() }, [])

  const set = (k: keyof Track, v: any) => setEditing(e => e && { ...e, [k]: v })

  const save = async () => {
    if (!editing?.title?.trim()) { setError('Название обязательно'); return }
    setBusy(true); setError('')
    try {
      if (editing.id) await api.updateTrack(editing.id, editing)
      else await api.createTrack(editing)
      setEditing(null)
      reload()
    } catch (e) { setError(String(e)) }
    setBusy(false)
  }

  const del = async (id: number) => {
    if (!confirm('Удалить трек?')) return
    await api.deleteTrack(id); reload()
  }

  const uploadCover = async (f: File | undefined) => {
    if (!f) return
    setBusy(true)
    try {
      const url = await api.upload(f)
      set('coverUrl', url)
    } catch (e) { setError(String(e)) }
    setBusy(false)
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: '0 0 16px' }}>Треки ({tracks.length})</h2>
        {!editing && <button className="abtn" onClick={() => { setError(''); setEditing({ ...EMPTY, sortOrder: tracks.length + 1 }) }}>+ Новый трек</button>}
      </div>

      {editing && (
        <div className="acard" style={{ borderColor: '#E3161B' }}>
          <div className="agrid" style={{ marginBottom: 12 }}>
            <label className="afield">Название *<input value={editing.title || ''} onChange={e => set('title', e.target.value)} /></label>
            <label className="afield">Строчка из песни<input value={editing.line || ''} onChange={e => set('line', e.target.value)} /></label>
            <label className="afield">Плашка (Сингл, Новинка…)<input value={editing.tag || ''} onChange={e => set('tag', e.target.value)} /></label>
            <label className="afield">Ссылка Яндекс Музыки<input value={editing.yandexUrl || ''} onChange={e => set('yandexUrl', e.target.value)} placeholder="https://music.yandex.ru/album/…/track/…" /></label>
            <label className="afield">Прямой mp3<input value={editing.mp3Url || ''} onChange={e => set('mp3Url', e.target.value)} /></label>
            <label className="afield">Ссылка на клип<input value={editing.clipUrl || ''} onChange={e => set('clipUrl', e.target.value)} /></label>
            <label className="afield">Порядок<input type="number" value={editing.sortOrder ?? 0} onChange={e => set('sortOrder', Number(e.target.value))} /></label>
            <label className="afield">Новый релиз?
              <select value={editing.isNew ? '1' : '0'} onChange={e => set('isNew', e.target.value === '1')}>
                <option value="0">нет</option><option value="1">да</option>
              </select>
            </label>
            <label className="afield">Обложка
              <input type="file" accept="image/*" onChange={e => uploadCover(e.target.files?.[0])} />
            </label>
          </div>
          {editing.coverUrl && <img src={editing.coverUrl} alt="" className="alist-cover" style={{ width: 80, height: 80 }} />}
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button className="abtn" onClick={save} disabled={busy}>{editing.id ? 'Сохранить' : 'Создать'}</button>
            <button className="abtn line" onClick={() => setEditing(null)}>Отмена</button>
          </div>
        </div>
      )}

      {error && <p style={{ color: '#FF3B3F' }}>{error}</p>}

      {tracks.map(t => (
        <div className="acard" key={t.id}>
          <div className="arow">
            <div style={{ fontWeight: 700, color: '#666' }}>{t.sortOrder}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{t.title} {t.isNew && <span className="astatus NEW">new</span>}</div>
              <div style={{ color: '#9a9aa2', fontStyle: 'italic' }}>{t.line}</div>
              <div style={{ color: '#666', fontSize: 13 }}>
                {t.tag && <span>{t.tag} · </span>}
                {t.yandexUrl && <span>яндекс · </span>}
                {t.mp3Url && <span>mp3 · </span>}
                {t.clipUrl && <span>клип</span>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="abtn line" onClick={() => { setError(''); setEditing({ ...t }) }}>Изменить</button>
              <button className="abtn danger" onClick={() => del(t.id)}>Удалить</button>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
