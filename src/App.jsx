import { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero3D from './components/Hero3D'
import ScrollFrames from './components/ScrollFrames'
import AuthModal from './components/AuthModal'

function App() {
  const [authOpen, setAuthOpen] = useState(false)

  const openAuth = useCallback(() => setAuthOpen(true), [])
  const closeAuth = useCallback(() => setAuthOpen(false), [])

  // Auto-suggest auth when user scrolls halfway down
  useEffect(() => {
    const onScroll = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (progress > 0.5 && !authOpen) setAuthOpen(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [authOpen])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background gradients / glow */}
      <div className="fixed inset-0 -z-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Navbar onSignIn={openAuth} />

      <main className="relative">
        <Hero3D />
        <ScrollFrames onHalfway={openAuth} />
      </main>

      <footer className="relative z-10 px-6 py-12 border-t border-white/10 bg-black/40 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-white/60">© {new Date().getFullYear()} Arcyn. All rights reserved.</p>
          <div className="text-white/60">Arcyn Find</div>
        </div>
      </footer>

      <AuthModal open={authOpen} onOpenChange={(v)=> v ? openAuth() : closeAuth()} />
    </div>
  )
}

export default App
