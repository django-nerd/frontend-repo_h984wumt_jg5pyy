import { useEffect } from 'react'
import { Menu, LogIn } from 'lucide-react'

export default function Navbar({ onSignIn }) {
  useEffect(() => {
    // no-op; placeholder for future dynamic effects
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent pointer-events-none" />
        <nav className="relative mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 shadow-[0_0_20px_rgba(169,107,255,0.6)]" />
            <span className="text-white/90 tracking-[0.12em] text-sm">ARCYN</span>
            <span className="text-white font-semibold">FIND</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden md:inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg">
              <Menu className="h-4 w-4" />
              <span>Menu</span>
            </button>
            <button onClick={onSignIn} className="group inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 text-white px-4 py-2 border border-white/10 backdrop-blur-md transition-all shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),0_0_20px_rgba(169,107,255,0.15)]">
              <LogIn className="h-4 w-4 text-purple-300 group-hover:text-purple-200" />
              <span className="font-medium">Sign In</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
