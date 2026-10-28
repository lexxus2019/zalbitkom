import type { Site } from './types'

// Данные на случай, когда бэкенд недоступен — сайт обязан открыться и так
export const FALLBACK: Site = {
  tracks: [
    { id: 1, title: 'Подорожник', line: 'Вальс угасает лениво', tag: 'Новый релиз', isNew: true, sortOrder: 1 },
    { id: 2, title: 'Спутано-сожжено', line: 'Ты же не Феникс. Я жгу твои корабли', tag: 'Сингл', clipUrl: 'https://vkvideo.ru/video-2000196336_154196336', sortOrder: 2 },
    { id: 3, title: '2:00', line: 'Знаю, ты не спишь, как и я сейчас', tag: 'Плейлист Звука', sortOrder: 3 },
    { id: 4, title: 'Повелитель мух', line: 'Сохрани. И выбери молчать', tag: 'Радио России', sortOrder: 4 },
    { id: 5, title: 'Он говорит', line: 'Стихи, которым сто лет, и голос, который звучит сегодня', tag: 'Радио России', sortOrder: 5 },
    { id: 6, title: 'Пенелопа', line: 'Научиться бы, как ты, хохотать над всеми', tag: 'Сингл', sortOrder: 6 },
    { id: 7, title: 'Сеть', line: 'А за стеклом улыбается манекен', tag: 'Сингл', sortOrder: 7 }
  ],
  links: [
    { id: 1, keyName: 'vk', label: 'ВКонтакте', url: '', sortOrder: 1 },
    { id: 2, keyName: 'telegram', label: 'Telegram', url: '', sortOrder: 2 },
    { id: 3, keyName: 'yandex', label: 'Яндекс Музыка', url: '', sortOrder: 3 },
    { id: 4, keyName: 'zvuk', label: 'Звук', url: '', sortOrder: 4 },
    { id: 5, keyName: 'donate', label: 'Донат', url: '', sortOrder: 5 }
  ]
}
