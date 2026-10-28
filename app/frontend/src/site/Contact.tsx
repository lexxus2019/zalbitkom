import { useState } from 'react'
import { s } from '../util'
import { sendMessage } from '../api'

export default function Contact() {
  const [name, setName] = useState('')
  const [replyTo, setReplyTo] = useState('')
  const [body, setBody] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!body.trim() || state === 'sending') return
    setState('sending')
    const ok = await sendMessage(name.trim(), replyTo.trim(), body.trim())
    if (ok) {
      setState('sent')
      setName(''); setReplyTo(''); setBody('')
    } else {
      setState('error')
    }
  }

  return (
    <section id="contact" className="pad" style={s('background: #000000; padding: 140px 56px')}>
      <div style={s('max-width: 1320px; margin: 0 auto')}>
        <h2 className="disp h2 rv" style={s('margin: 0 0 24px; font-weight: 900; font-size: 112px; line-height: .86; text-transform: uppercase')}>Написать группе</h2>
        <p className="rv" style={s('margin: 0 0 48px; font-size: 18px; line-height: 1.65; max-width: 560px; color: #cfcac4')}>Концерты, коллаборации, вопросы о треках — всё сюда. Дочитаем обязательно.</p>
        <form className="frm rv" onSubmit={submit} style={s('display: grid; gap: 20px; max-width: 640px')}>
          <div className="g2" style={s('display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px')}>
            <label>Как тебя зовут
              <input value={name} onChange={e => setName(e.target.value)} maxLength={100} placeholder="Имя" />
            </label>
            <label>Куда отвечать
              <input value={replyTo} onChange={e => setReplyTo(e.target.value)} maxLength={200} placeholder="почта или @telegram" />
            </label>
          </div>
          <label>Сообщение
            <textarea value={body} onChange={e => setBody(e.target.value)} maxLength={3000} required placeholder="Расскажи, что нужно" />
          </label>
          <div style={s('display: flex; align-items: center; gap: 24px')}>
            <button className="btn btn-red" type="submit" disabled={state === 'sending'} style={s('border: 0; font-family: inherit')}>
              {state === 'sending' ? 'Отправляю…' : 'Отправить'}
            </button>
            {state === 'sent' && <span className="frm-msg" style={{ color: '#66d97f' }}>Готово, доставлено в зал</span>}
            {state === 'error' && <span className="frm-msg" style={{ color: '#FF3B3F' }}>Не получилось — попробуй позже или напиши в Telegram</span>}
          </div>
        </form>
      </div>
    </section>
  )
}
