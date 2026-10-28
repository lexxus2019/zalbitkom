import { useEffect, useState, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Site from './site/Site'
import Admin from './admin/Admin'
import { loadSite } from './api'
import { FALLBACK } from './fallback'
import type { Site as SiteData } from './types'
import './styles.css'

function Public() {
  const [site, setSite] = useState<SiteData>(FALLBACK)
  useEffect(() => { loadSite().then(r => setSite(r.site)) }, [])
  return <Site site={site} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<Public />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
