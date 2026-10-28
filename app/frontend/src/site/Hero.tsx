import { useCallback, useEffect, useRef, useState } from 'react'
import { s } from '../util'
import { MEMBERS, MARQUEE_LINES, CLIP_URL } from './config'
import type { Site } from '../types'
import { linkFor } from '../api'

export default function Hero({ site }: { site: Site }) {
  const [cur, setCur] = useState(0)
  const [swap, setSwap] = useState(false)
  const curRef = useRef(0)
  const timer = useRef<number | undefined>(undefined)
  const headerRef = useRef<HTMLElement>(null)

  const show = useCallback((i: number) => {
    if (i === curRef.current) return
    curRef.current = i
    setCur(i)
    setSwap(true)
    window.setTimeout(() => setSwap(false), 180)
  }, [])

  useEffect(() => {
    const auto = window.setInterval(() => show((curRef.current + 1) % MEMBERS.length), 2800)
    return () => window.clearInterval(auto)
  }, [show])

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const i = Math.min(MEMBERS.length - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * MEMBERS.length)))
      show(i)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [show])

  const tg = linkFor(site, 'telegram')

  return (
    <header ref={headerRef} id="top" style={s('position: relative; min-height: 100vh; display: flex; flex-direction: column; overflow: hidden; background: #000000')}>
      <div id="heroStack" className="duo hero-photo hide-m" style={s('position: absolute; top: 0; right: 0; bottom: 0; width: 46%')}>
        {MEMBERS.map((m, i) => (
          <img key={m.name} src={m.img} alt={m.alt} className={'layer' + (i === cur ? ' on' : '')}
               loading={i === 0 ? undefined : 'lazy'} decoding="async" width={525} height={700}
               style={{ objectPosition: m.pos }} />
        ))}
      </div>
      <div className="hide-m" style={s('position: absolute; top: 0; bottom: 0; right: 46%; width: 30%; background: linear-gradient(90deg, #000000 0%, rgba(0,0,0,0) 100%); transform: translateX(100%)')} />

      <nav className="pad up" style={s('position: relative; z-index: 3; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 28px 56px')}>
        <a href="#top" style={s('display: flex; align-items: center; gap: 12px; font-size: 15px; color: #d8d3cd; text-decoration: none')}>
          <span className="dot" />Рок-коллектив из Рыбинска с 2021 года
        </a>
        <div className="hide-m" style={s('display: flex; align-items: center; gap: 32px')}>
          <a className="navlink" href="#music">Музыка</a>
          <a className="navlink" href="#band">Группа</a>
          <a className="navlink" href="#clip">Клип</a>
          <a className="navlink" href="#stage">Состав</a>
        </div>
        <a className="btn btn-red" href={tg || '#listen'} {...(tg ? { target: '_blank', rel: 'noopener' } : {})} style={s('min-height: 44px; padding: 0 22px; font-size: 15px')}>Подписаться</a>
      </nav>

      <div className="pad" style={s('position: relative; z-index: 3; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; gap: 28px; padding: 40px 56px 180px; max-width: 900px')}>
        <h1 className="up d2" style={s('margin: 0; line-height: 0')}>
          <img className="hero-logo" src="/img/logo.png" alt="Зал Бит.коМ" width={900} height={558}
               style={s('display: block; width: 640px; max-width: 100%; height: auto; filter: drop-shadow(0 6px 30px rgba(0,0,0,.6))')} />
        </h1>
        <p className="poem up d4" style={s('margin: 0; max-width: 560px; font-size: 24px; line-height: 1.45; color: #ece8e3')}>
          У каждой ноты есть своя история, и мы их расскажем
        </p>
        <div className="up d5" style={s('display: flex; flex-wrap: wrap; gap: 14px; margin-top: 8px')}>
          <a className="btn btn-red" href={CLIP_URL} target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true"><path d="M7 4.5v15l12-7.5z" /></svg>
            Смотреть клип
          </a>
          <a className="btn btn-line" href="#music">О чём мы поём</a>
        </div>
      </div>

      <div className="who" aria-live="polite">
        <span className="who-hint">Веди курсором, чтобы сменить участника</span>
        <span className={'who-name' + (swap ? ' swap' : '')}>{MEMBERS[cur].name}</span>
        <span className="who-bars">{MEMBERS.map((m, i) => <i key={m.name} className={i === cur ? 'on' : ''} />)}</span>
      </div>

      <svg aria-hidden="true" viewBox="0 0 1440 140" preserveAspectRatio="none" style={s('position: absolute; z-index: 2; left: 0; right: 0; bottom: 36px; width: 100%; height: 140px')}>
        <path className="ekg-base" d="M0 90 H470 L500 90 L516 40 L540 128 L566 8 L590 116 L606 90 H880 L900 90 L912 62 L928 112 L942 90 H1180 L1196 90 L1204 74 L1214 100 L1222 90 H1440" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <path className="ekg-beat" d="M0 90 H470 L500 90 L516 40 L540 128 L566 8 L590 116 L606 90 H880 L900 90 L912 62 L928 112 L942 90 H1180 L1196 90 L1204 74 L1214 100 L1222 90 H1440" fill="none" stroke="#E3161B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>

      <div style={s('position: absolute; z-index: 3; left: 0; right: 0; bottom: 0; height: 36px; background: #E3161B; overflow: hidden; display: flex; align-items: center')}>
        <div className="track">
          <span className="poem" style={s('white-space: nowrap; font-size: 16px; color: #000000; padding-right: 48px')}>{MARQUEE_LINES}</span>
          <span className="poem" aria-hidden="true" style={s('white-space: nowrap; font-size: 16px; color: #000000; padding-right: 48px')}>{MARQUEE_LINES}</span>
        </div>
      </div>
    </header>
  )
}
