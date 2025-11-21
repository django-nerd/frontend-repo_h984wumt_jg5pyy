import { useMemo } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  const label = useMemo(() => (isDark ? 'Switch to light' : 'Switch to dark'), [isDark])
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all shadow-sm
                 bg-white/70 hover:bg-white/90 border-cyan-200/60 text-slate-900 backdrop-blur-md
                 dark:bg-slate-900/60 dark:hover:bg-slate-900/80 dark:border-slate-700 dark:text-slate-100"
    >
      {isDark ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-cyan-600" />}
      <span className="hidden md:inline">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
