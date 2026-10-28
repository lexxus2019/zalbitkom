export interface Track {
  id: number
  title: string
  line?: string | null
  tag?: string | null
  isNew?: boolean | null
  yandexUrl?: string | null
  mp3Url?: string | null
  clipUrl?: string | null
  coverUrl?: string | null
  sortOrder?: number | null
}

export interface SiteLink {
  id: number
  keyName: string
  label?: string | null
  url?: string | null
  sortOrder?: number | null
}

export interface Site {
  tracks: Track[]
  links: SiteLink[]
}

export interface Message {
  id: number
  name?: string | null
  replyTo?: string | null
  body: string
  status: string
  createdAt: string
}
