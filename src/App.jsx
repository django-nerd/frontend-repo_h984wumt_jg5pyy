import { useCallback, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero3D from './components/Hero3D'
import ScrollFrames from './components/ScrollFrames'

function App() {
  const hasAutoScrolledRef = useRef(false)

  const scrollToAuth = useCallback(() => {
    const el = document.getElementById('auth-frame')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const onHalfway = useCallback(() => {
    if (hasAutoScrolledRef.current) return
    const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight)
    if (progress > 0.5) {
      const el = document.getElementById('auth-frame')
      if (el) {
        hasAutoScrolledRef.current = true
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background gradients / glow */}
      <div className="fixed inset-0 -z-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Navbar onSignIn={scrollToAuth} />

      <main className="relative">
        <Hero3D />
        <ScrollFrames onHalfway={onHalfway} />
      </main>

      <footer className="relative z-10 px-6 py-12 border-t border-white/10 bg-black/40 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-white/60">© {new Date().getFullYear()} Arcyn. All rights reserved.</p>
          <div className="text-white/60">Arcyn Find</div>
        </div>
      </footer>
    </div>
  )
}

export default App
