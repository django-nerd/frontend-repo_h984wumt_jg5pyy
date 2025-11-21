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
    <div className="min-h-screen bg-white text-slate-900">
      {/* Light crystalline background accents */}
      <div className="fixed inset-0 -z-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <Navbar onSignIn={scrollToAuth} />

      <main className="relative">
        <Hero3D />

        {/* Credits / Partnerships */}
        <section className="relative z-10 py-10 px-6">
          <div className="max-w-5xl mx-auto rounded-2xl border border-cyan-200/60 bg-white/70 backdrop-blur-xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-wider text-cyan-700/80">Developed by</p>
                <h3 className="text-xl font-semibold">Arcyn Team</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <a href="https://instagram.com/arcyn.ai" target="_blank" rel="noreferrer" className="text-cyan-700 hover:text-cyan-900 underline underline-offset-4">Instagram</a>
                  <span className="text-slate-400">•</span>
                  <a href="https://arcyn.ai/bio" target="_blank" rel="noreferrer" className="text-emerald-700 hover:text-emerald-900 underline underline-offset-4">Bio</a>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-wider text-emerald-700/80">Partnered with</p>
                <h3 className="text-xl font-semibold">Arcyn Partners</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <a href="https://instagram.com/arcyn.partners" target="_blank" rel="noreferrer" className="text-cyan-700 hover:text-cyan-900 underline underline-offset-4">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ScrollFrames onHalfway={onHalfway} />
      </main>

      <footer className="relative z-10 px-6 py-12 border-t border-cyan-200/60 bg-white/70 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-slate-600">© {new Date().getFullYear()} Arcyn. All rights reserved.</p>
          <div className="text-slate-600">Arcyn Find</div>
        </div>
      </footer>
    </div>
  )
}

export default App
