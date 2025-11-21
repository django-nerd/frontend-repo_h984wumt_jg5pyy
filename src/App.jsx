import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero3D from './components/Hero3D'
import ScrollFrames from './components/ScrollFrames'

function App() {
  const hasAutoScrolledRef = useRef(false)

  // Theme state with persistence
  const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'light'
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  }
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

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

  const bgAccents = useMemo(() => (
    <div className="fixed inset-0 -z-0 pointer-events-none" aria-hidden>
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10" />
      <div className="absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/10" />
    </div>
  ), [])

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {bgAccents}

      <Navbar onSignIn={scrollToAuth} theme={theme} onToggleTheme={toggleTheme} />

      <main className="relative">
        <Hero3D />

        {/* Credits / Partnerships */}
        <section className="relative z-10 py-10 px-6">
          <div className="max-w-5xl mx-auto rounded-2xl border border-cyan-200/60 bg-white/70 backdrop-blur-xl p-6 shadow-sm
                          dark:border-slate-700 dark:bg-slate-900/60">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-wider text-cyan-700/80 dark:text-cyan-300/80">Developed by</p>
                <h3 className="text-xl font-semibold">Arcyn Team</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <a href="https://instagram.com/arcyn.ai" target="_blank" rel="noreferrer" className="text-cyan-700 hover:text-cyan-900 underline underline-offset-4 dark:text-cyan-300 dark:hover:text-cyan-200">Instagram</a>
                  <span className="text-slate-400 dark:text-slate-500">•</span>
                  <a href="https://arcyn.ai/bio" target="_blank" rel="noreferrer" className="text-emerald-700 hover:text-emerald-900 underline underline-offset-4 dark:text-emerald-300 dark:hover:text-emerald-200">Bio</a>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-wider text-emerald-700/80 dark:text-emerald-300/80">Partnered with</p>
                <h3 className="text-xl font-semibold">Arcyn Partners</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <a href="https://instagram.com/arcyn.partners" target="_blank" rel="noreferrer" className="text-cyan-700 hover:text-cyan-900 underline underline-offset-4 dark:text-cyan-300 dark:hover:text-cyan-200">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ScrollFrames onHalfway={onHalfway} />
      </main>

      <footer className="relative z-10 px-6 py-12 border-t border-cyan-200/60 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-slate-600 dark:text-slate-400">© {new Date().getFullYear()} Arcyn. All rights reserved.</p>
          <div className="text-slate-600 dark:text-slate-400">Arcyn Find</div>
        </div>
      </footer>
    </div>
  )
}

export default App
