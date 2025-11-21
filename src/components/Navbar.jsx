import { useEffect } from 'react'
import { Menu, LogIn } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navbar({ onSignIn, theme, onToggleTheme }) {
  useEffect(() => {
    // reserved for small interactive polish
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-transparent pointer-events-none dark:from-slate-900/70 dark:via-slate-900/40" />
        <nav className="relative mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 shadow-[0_0_20px_rgba(59,130,246,0.35)]" />
            <span className="text-slate-700 tracking-[0.12em] text-sm dark:text-slate-300">ARCYN</span>
            <span className="text-slate-900 font-semibold dark:text-white">FIND</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button className="hidden md:inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 rounded-lg dark:text-slate-300 dark:hover:text-white">
              <Menu className="h-4 w-4" />
              <span>Menu</span>
            </button>
            <button onClick={onSignIn} className="group inline-flex items-center gap-2 rounded-xl bg-white/70 hover:bg-white/90 text-slate-900 px-4 py-2 border border-cyan-200/60 backdrop-blur-md transition-all shadow-sm dark:bg-slate-900/60 dark:hover:bg-slate-900/80 dark:text-slate-100 dark:border-slate-700">
              <LogIn className="h-4 w-4 text-cyan-600 group-hover:text-cyan-700 dark:text-cyan-300" />
              <span className="font-medium">Sign In</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
