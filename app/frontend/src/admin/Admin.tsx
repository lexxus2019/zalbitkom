import { useEffect, useState } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { getToken, api } from './adminApi'
import Tracks from './Tracks'
import Links from './Links'
import Messages from './Messages'

function Login({ onDone }: { onDone: () => void }) {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try { await api.login(username, password); onDone() }
    catch { setError('Неверный логин или пароль') }
  }
  return (
    <div className="admin"><div className="admin-wrap">
      <form className="login-box" onSubmit={submit}>
        <h1>Зал Бит.коМ — админка</h1>
        <label className="afield">Логин
          <input value={username} onChange={e => setUsername(e.target.value)} autoFocus />
        </label>
        <label className="afield">Пароль
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button className="abtn" type="submit">Войти</button>
        {error && <span style={{ color: '#FF3B3F' }}>{error}</span>}
      </form>
    </div></div>
  )
}

function Layout({ children, onLogout }: { children: React.ReactNode; onLogout: () => void }) {
  return (
    <div className="admin">
      <div className="admin-wrap">
        <div className="admin-top">
          <h1 style={{ margin: 0 }}>Зал Бит.коМ</h1>
          <nav className="admin-nav">
            <NavLink to="/admin" end>Треки</NavLink>
            <NavLink to="/admin/links">Ссылки</NavLink>
            <NavLink to="/admin/messages">Сообщения</NavLink>
          </nav>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 16, alignItems: 'center' }}>
            <a href="/" target="_blank" rel="noopener" style={{ color: '#9a9aa2' }}>на сайт ↗</a>
            <button className="abtn line" onClick={onLogout}>Выйти</button>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  useEffect(() => {
    if (!getToken()) { setAuthed(false); return }
    api.tracks().then(() => setAuthed(true)).catch(() => setAuthed(false))
  }, [])
  if (authed === null) return <div className="admin" />
  if (!authed) return <Login onDone={() => setAuthed(true)} />
  return (
    <Layout onLogout={() => { api.logout(); setAuthed(false) }}>
      <Routes>
        <Route path="/" element={<Tracks />} />
        <Route path="/links" element={<Links />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Layout>
  )
}
