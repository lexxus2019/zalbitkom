import { useEffect, useState } from 'react'
import { api } from './adminApi'
import type { Message } from '../types'

const STATUSES = ['NEW', 'IN_PROGRESS', 'DONE']

export default function Messages() {
  const [msgs, setMsgs] = useState<Message[]>([])
  const reload = () => api.messages().then(setMsgs).catch(() => {})
  useEffect(() => { reload() }, [])

  return (
    <>
      <h2 style={{ margin: '0 0 16px' }}>Сообщения с сайта ({msgs.length})</h2>
      {msgs.map(m => (
        <div className="acard" key={m.id}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
            <span className={'astatus ' + m.status}>{m.status}</span>
            <b>{m.name || 'аноним'}</b>
            {m.replyTo && <a href={m.replyTo.includes('@') && !m.replyTo.startsWith('http') ? 'https://t.me/' + m.replyTo.replace('@', '') : m.replyTo} target="_blank" rel="noopener" style={{ color: '#4fc3f7' }}>{m.replyTo}</a>}
            <span style={{ marginLeft: 'auto', color: '#666', fontSize: 13 }}>{new Date(m.createdAt).toLocaleString('ru-RU')}</span>
          </div>
          <p style={{ margin: '0 0 14px', whiteSpace: 'pre-wrap' }}>{m.body}</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {STATUSES.filter(st => st !== m.status).map(st => (
              <button key={st} className="abtn line" onClick={async () => { await api.setMessageStatus(m.id, st); reload() }}>{st}</button>
            ))}
            <button className="abtn danger" style={{ marginLeft: 'auto' }} onClick={async () => { if (confirm('Удалить?')) { await api.deleteMessage(m.id); reload() } }}>Удалить</button>
          </div>
        </div>
      ))}
      {msgs.length === 0 && <p style={{ color: '#666' }}>Пока пусто</p>}
    </>
  )
}
