import { s } from '../util'
import { MEMBERS, CLIP_URL } from './config'
import type { Site } from '../types'
import { linkFor } from '../api'

export function Intro() {
  return (
    <section className="pad" style={s('padding: 140px 56px; background: #000000')}>
      <div className="g2" style={s('display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 64px; align-items: center; max-width: 1320px; margin: 0 auto')}>
        <div className="disp clock rv" aria-label="Два часа ночи" style={s('font-weight: 900; font-size: 300px; line-height: .8; color: #E3161B; letter-spacing: -4px')}>2<span className="colon">:</span>00</div>
        <div className="rv" style={s('display: flex; flex-direction: column; gap: 22px; max-width: 560px')}>
          <h2 className="disp h2" style={s('margin: 0; font-weight: 700; font-size: 72px; line-height: .95')}>Мы не боимся залезать к тебе в голову</h2>
          <p style={s('margin: 0; font-size: 18px; line-height: 1.65; color: #cfcac4')}>С 2021 года исследуем сложные темы: как люди уживаются друг с другом и с миром вокруг. Особенно в тот час, когда разум уже сдался, а мысли ещё нет.</p>
          <p style={s('margin: 0; font-size: 18px; line-height: 1.65; color: #cfcac4')}>Наши тексты это терапия через сарказм. Музыка от блюзовой меланхолии до гаражного надрыва.</p>
        </div>
      </div>
    </section>
  )
}

export function Band({ site }: { site: Site }) {
  const donate = linkFor(site, 'donate')
  return (
    <section id="band" style={s('background: #E4DED8; color: #000000; overflow: hidden')}>
      <div style={s('position: relative')}>
        <img className="rv-fade" src="/img/band-group.jpg" alt="Участники группы Зал Бит.коМ смотрят в камеру сверху вниз" loading="lazy" decoding="async" width={1200} height={900} style={s('display: block; width: 100%; height: auto')} />
      </div>
      <div className="pad" style={s('padding: 100px 56px 130px')}>
        <div className="g2" style={s('display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 64px; max-width: 1320px; margin: 0 auto; align-items: start')}>
          <h2 className="disp h2 rv" style={s('margin: 0; font-weight: 900; font-size: 112px; line-height: .86; text-transform: uppercase')}>Почему Зал Бит.коМ?</h2>
          <div className="rv" style={s('display: flex; flex-direction: column; gap: 20px; padding-top: 12px')}>
            <p style={s('margin: 0; font-size: 20px; line-height: 1.6')}>Точный смысл названия мы намеренно не раскрываем.</p>
            <p className="poem" style={s('margin: 0; font-size: 30px; line-height: 1.35')}>Единственная подсказка: это наша мечта. Собирать залы битком</p>
            <a className="btn btn-ink" href={donate || '#listen'} {...(donate ? { target: '_blank', rel: 'noopener' } : {})} style={s('align-self: flex-start; margin-top: 12px')}>Помочь мечте сбыться</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Stage() {
  return (
    <section id="stage" style={s('background: #000000; padding: 140px 0 0')}>
      <div className="pad" style={s('padding: 0 56px; max-width: 1432px; margin: 0 auto 56px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 24px')}>
        <h2 className="disp h2 rv" style={s('margin: 0; font-weight: 900; font-size: 112px; line-height: .86; text-transform: uppercase')}>Кто на сцене</h2>
        <p className="rv" style={s('margin: 0; max-width: 420px; font-size: 18px; line-height: 1.6; color: #cfcac4')}>Живой рок рождается из историй, поэзии и жизни</p>
      </div>
      <div className="g4" style={s('display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 4px')}>
        {MEMBERS.map((m, i) => (
          <figure key={m.name} className={'member rv' + (i === 0 ? ' lead' : '')} style={s('margin: 0; aspect-ratio: 3 / 4')}>
            <img src={m.img} alt={m.alt} loading="lazy" decoding="async" width={525} height={700} style={{ objectPosition: m.pos }} />
            <figcaption className="disp" style={s('position: absolute; left: 20px; bottom: 16px; font-size: 34px; font-weight: 700')}>{m.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export function Clip() {
  return (
    <section id="clip" style={s('position: relative; background: #E3161B; color: #000000; overflow: hidden')}>
      <div className="duo hide-m" style={s('position: absolute; inset: 0; opacity: .55')}>
        <img src="/img/drums.jpg" alt="" loading="lazy" decoding="async" width={525} height={700} style={s('width: 100%; height: 100%; object-fit: cover; object-position: 50% 40%')} />
      </div>
      <a href={CLIP_URL} target="_blank" rel="noopener" className="pad" style={s('position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 28px; padding: 150px 56px; text-decoration: none; color: #000000; max-width: 1432px; margin: 0 auto')}>
        <span style={s('font-size: 18px; font-weight: 600')}>Новый клип уже на VK Видео</span>
        <span className="disp h2" style={s('font-weight: 900; font-size: 168px; line-height: .82; text-transform: uppercase; max-width: 1000px')}>Спутано-<br />сожжено</span>
        <span style={s('display: flex; align-items: center; gap: 18px; font-size: 20px; font-weight: 600')}>
          <span className="play heart" style={s('display: flex; align-items: center; justify-content: center; width: 88px; height: 88px; border-radius: 50%; background: #000000; color: #ffffff')}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          </span>
          Смотреть клип
        </span>
      </a>
    </section>
  )
}

export function Proof() {
  const items = [
    ['Фестивали', 'ВолгаФест, Ковчег, Демино-Фест и Небо'],
    ['Москва', 'Выступление в баре Мумий Тролль на фестивале Show Class'],
    ['Радио России', 'Два эфира в программе Aurum Inutile с треками Он говорит и Повелитель мух'],
    ['Сбер.Звук', 'Сингл 2:00 попал в редакторский плейлист']
  ]
  const strip = 'ВолгаФест / Ковчег / Демино-Фест / Небо / Show Class /'
  return (
    <section className="pad" style={s('background: #000000; padding: 140px 56px')}>
      <div style={s('max-width: 1320px; margin: 0 auto')}>
        <h2 className="disp h2 rv" style={s('margin: 0 0 64px; font-weight: 900; font-size: 112px; line-height: .86; text-transform: uppercase')}>Что по делу</h2>
        <div className="g2" style={s('display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 64px')}>
          {items.map(([t, d]) => (
            <div key={t} className="rv" style={s('display: flex; flex-direction: column; gap: 12px; padding: 32px 0; border-top: 1px solid rgba(255,255,255,.3)')}>
              <span className="disp" style={s('font-size: 44px; font-weight: 700; line-height: 1')}>{t}</span>
              <span style={s('font-size: 18px; line-height: 1.6; color: #cfcac4')}>{d}</span>
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden="true" style={s('margin-top: 64px; overflow: hidden')}>
        <div className="track track-slow">
          <span className="disp" style={s('white-space: nowrap; font-weight: 700; font-size: 56px; line-height: 1; text-transform: uppercase; color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,.5); padding-right: 60px')}>{strip}</span>
          <span className="disp" style={s('white-space: nowrap; font-weight: 700; font-size: 56px; line-height: 1; text-transform: uppercase; color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,.5); padding-right: 60px')}>{strip}</span>
        </div>
      </div>
    </section>
  )
}

export function Listen({ site }: { site: Site }) {
  const btn = (k: string, label: string) => {
    const u = linkFor(site, k)
    return <a key={k} className="btn btn-ink" href={u || '#music'} {...(u ? { target: '_blank', rel: 'noopener' } : {})}>{label}</a>
  }
  return (
    <section id="listen" className="pad" style={s('background: #E4DED8; color: #000000; padding: 140px 56px')}>
      <div style={s('max-width: 1320px; margin: 0 auto')}>
        <div className="g2" style={s('display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 64px; align-items: end; margin-bottom: 64px')}>
          <h2 className="disp h2 rv" style={s('margin: 0; font-weight: 900; font-size: 112px; line-height: .86; text-transform: uppercase')}>Три сингла до Нового года</h2>
          <p className="rv" style={s('margin: 0; font-size: 18px; line-height: 1.65; max-width: 480px')}>Подпишись, чтобы услышать их первым. Сохранённый трек лучше всего помогает группе попасть в плейлисты</p>
        </div>
        <div className="g3" style={s('display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-bottom: 64px')}>
          {['01', '02', '03'].map(n => (
            <div key={n} className="rv" style={s('display: flex; flex-direction: column; justify-content: space-between; gap: 60px; padding: 28px; min-height: 220px; border: 2px solid #000000; border-radius: 6px')}>
              <span className="disp" style={s('font-size: 96px; font-weight: 900; line-height: .8')}>{n}</span>
              <span style={s('display: flex; align-items: center; gap: 12px; font-size: 16px; font-weight: 600')}><span className="dot" />Скоро</span>
            </div>
          ))}
        </div>
        <div className="rv" style={s('display: flex; flex-wrap: wrap; gap: 14px')}>
          {btn('yandex', 'Яндекс Музыка')}
          {btn('zvuk', 'Звук')}
          {btn('vk', 'ВКонтакте')}
          {btn('telegram', 'Telegram')}
        </div>
      </div>
    </section>
  )
}

export function SiteFooter({ site }: { site: Site }) {
  const link = (k: string, label: string) => {
    const u = linkFor(site, k)
    if (!u) return null
    return <a key={k} className="navlink" href={u} target="_blank" rel="noopener">{label}</a>
  }
  const tg = linkFor(site, 'telegram')
  const vk = linkFor(site, 'vk')
  return (
    <footer style={s('position: relative; background: #000000; overflow: hidden')}>
      <div style={s('position: relative')}>
        <img className="rv-fade" src="/img/footer-group.jpg" alt="Группа Зал Бит.коМ сидит на полу студии" loading="lazy" decoding="async" width={1200} height={900} style={s('display: block; width: 100%; max-height: 80vh; object-fit: cover; object-position: 50% 0%; opacity: .5')} />
        <div className="pad" style={s('position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end; gap: 24px; padding: 56px; background: linear-gradient(0deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,0) 60%)')}>
          <p className="poem rv" style={s('margin: 0; max-width: 640px; font-size: 26px; line-height: 1.4')}>Включай, если хочешь не просто слушать, а проживать музыку</p>
          <h2 className="poem rv" style={s('margin: 0; font-weight: 400; font-size: 64px; line-height: 1.1')}>Добро пожаловать в зал</h2>
          <div className="rv" style={s('display: flex; flex-wrap: wrap; gap: 12px')}>
            <a className="btn btn-red" href={tg || '#listen'} {...(tg ? { target: '_blank', rel: 'noopener' } : {})}>Подписаться в Telegram</a>
            <a className="btn btn-line" href={vk || '#listen'} {...(vk ? { target: '_blank', rel: 'noopener' } : {})}>Группа ВКонтакте</a>
          </div>
        </div>
      </div>
      <div className="pad" style={s('display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 20px; padding: 32px 56px; border-top: 1px solid rgba(255,255,255,.2)')}>
        <img src="/img/logo.png" alt="Зал Бит.коМ" loading="lazy" decoding="async" width={900} height={558} style={s('height: 80px; width: auto')} />
        <div style={s('display: flex; flex-wrap: wrap; gap: 22px; align-items: center')}>
          {link('vk', 'ВКонтакте')}
          {link('telegram', 'Telegram')}
          {link('yandex', 'Яндекс Музыка')}
          {link('zvuk', 'Звук')}
          <span style={s('font-size: 14px; color: #a9a39c')}>Рыбинск, с 2021 года</span>
        </div>
      </div>
    </footer>
  )
}
