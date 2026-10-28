export interface Member {
  name: string
  img: string
  pos: string
  alt: string
}

export const MEMBERS: Member[] = [
  { name: 'Вокал', img: '/img/vocal.jpg', pos: '55% 28%', alt: 'Вокалистка Наталья Трубецкая поёт на сцене' },
  { name: 'Гитара', img: '/img/hero.jpg', pos: '50% 30%', alt: 'Гитарист на сцене' },
  { name: 'Бас', img: '/img/bass.jpg', pos: '50% 28%', alt: 'Бас-гитарист на сцене' },
  { name: 'Клавиши', img: '/img/keys.jpg', pos: '50% 30%', alt: 'Клавишница на сцене' },
  { name: 'Барабаны', img: '/img/drums.jpg', pos: '50% 40%', alt: 'Барабанщик на сцене' }
]

export const MARQUEE_LINES =
  'Ты же не Феникс. Я жгу твои корабли \u00a0\u00a0/\u00a0\u00a0 А за стеклом улыбается манекен \u00a0\u00a0/\u00a0\u00a0 Сохрани. И выбери молчать \u00a0\u00a0/\u00a0\u00a0 Два ноль ноль на часах \u00a0\u00a0/\u00a0\u00a0 Вот приложи подорожник \u00a0\u00a0/\u00a0\u00a0 Научиться бы, как ты, хохотать над всеми \u00a0\u00a0/\u00a0\u00a0'

export const CLIP_URL = 'https://vkvideo.ru/video-2000196336_154196336'
