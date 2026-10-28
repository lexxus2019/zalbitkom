import { useState } from 'react'
import { s, yaSrc } from '../util'
import type { Track } from '../types'

const Play = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
)

function Row({ track, open, onToggle }: { track: Track; open: boolean; onToggle: () => void }) {
  const ya = yaSrc(track.yandexUrl || undefined)
  const playable = !!(ya || track.mp3Url)
  const headUrl = track.yandexUrl || track.clipUrl || undefined

  const onHeadClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a,button')) return
    if (headUrl) window.open(headUrl, '_blank', 'noopener')
  }

  return (
    <div className={'trk' + (open ? ' open' : '')}>
      <div className={'trk-head' + (headUrl ? ' link' : '')} onClick={onHeadClick} title={headUrl ? 'Открыть трек в новой вкладке' : undefined}>
        <span className="trk-title">{track.title}</span>
        <span className="trk-line">{track.line}</span>
        <span className="trk-act">
          {track.tag && <span className={'trk-tag' + (track.isNew ? ' new' : '')}>{track.tag}</span>}
          {track.clipUrl && <a className="trk-btn ghost" href={track.clipUrl} target="_blank" rel="noopener">Клип</a>}
          {playable && (
            <button className="trk-btn" type="button" aria-expanded={open} onClick={onToggle}>
              <span className="ic">{open ? <span className="eq"><i /><i /><i /></span> : <Play />}</span>
              <span>{open ? 'Свернуть' : 'Слушать'}</span>
            </button>
          )}
        </span>
      </div>
      {playable && (
        <div className="trk-player">
          <div className="trk-player-in">
            {open && (ya
              ? <iframe src={ya} title={track.title + ' на Яндекс Музыке'} loading="lazy" allow="autoplay; encrypted-media" />
              : <audio controls autoPlay preload="none" src={track.mp3Url || undefined} />)}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Music({ tracks }: { tracks: Track[] }) {
  const [openId, setOpenId] = useState<number | null>(null)
  return (
    <section id="music" className="pad" style={s('background: #E4DED8; color: #000000; padding: 0 56px 140px')}>
      <div style={s('max-width: 1320px; margin: 0 auto; border-top: 2px solid #000000; padding-top: 72px')}>
        <div className="g2" style={s('display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 64px; align-items: end; margin-bottom: 72px')}>
          <div className="rv" style={s('display: flex; flex-direction: column; gap: 22px')}>
            <h2 className="disp h2" style={s('margin: 0; font-weight: 900; font-size: 112px; line-height: .86; text-transform: uppercase')}>О чём мы поём</h2>
            <p style={s('margin: 0; font-size: 18px; line-height: 1.65; max-width: 540px')}>Всё начинается с поэзии рыбинского автора Любови Чубовой. Её философские тексты фундамент всего, что мы делаем. Сверху гитарные риффы, выразительные соло и голос Натальи Трубецкой.</p>
          </div>
          <blockquote className="poem rv" style={s('margin: 0; font-size: 44px; line-height: 1.2; color: #000000')}>
            Всё вверх тормашками, спутано, сожжено.
            <span style={s('display: block; margin-top: 14px; font-size: 18px; font-family: \'Golos Text\', system-ui, sans-serif; font-style: normal; color: #4a4540')}>Та самая магия, когда текст и музыка совпадают по ритмике</span>
          </blockquote>
        </div>
        <div style={s('display: flex; flex-direction: column; border-bottom: 1px solid rgba(0,0,0,.25)')}>
          {tracks.map(t => (
            <Row key={t.id} track={t} open={openId === t.id} onToggle={() => setOpenId(openId === t.id ? null : t.id)} />
          ))}
        </div>
      </div>
    </section>
  )
}
