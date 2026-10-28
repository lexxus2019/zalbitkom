import Hero from './Hero'
import Music from './Music'
import Contact from './Contact'
import { Intro, Band, Stage, Clip, Proof, Listen, SiteFooter } from './Sections'
import type { Site as SiteData } from '../types'

export default function Site({ site }: { site: SiteData }) {
  return (
    <div style={{ width: '100%', minWidth: 320, background: '#000000', overflowX: 'hidden' }}>
      <Hero site={site} />
      <Intro />
      <Band site={site} />
      <Music tracks={site.tracks} />
      <Stage />
      <Clip />
      <Proof />
      <Listen site={site} />
      <Contact />
      <SiteFooter site={site} />
    </div>
  )
}
