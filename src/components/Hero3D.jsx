import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const sampleQueries = [
  'Arcyn Find',
  'Arcyn Find realtime ranking',
  'Arcyn Find compare models',
]

function useTypewriter(lines, speed = 36, pause = 900) {
  const [display, setDisplay] = useState('')
  const full = useMemo(() => lines.join('\n'), [lines])
  useEffect(() => {
    let i = 0
    let mounted = true
    let timer
    const tick = () => {
      if (!mounted) return
      if (i <= full.length) {
        setDisplay(full.slice(0, i))
        i++
        const ch = full[i - 1]
        const delay = ch === '\n' ? pause : speed
        timer = setTimeout(tick, delay)
      } else {
        i = 0
        timer = setTimeout(tick, pause)
      }
    }
    timer = setTimeout(tick, 400)
    return () => {
      mounted = false
      clearTimeout(timer)
    }
  }, [full, speed, pause])
  return display
}

export default function Hero3D() {
  const sequenceRef = useRef(0)
  const [phase, setPhase] = useState('intro') // intro -> open -> zoom -> search -> preview
  // Loop phases
  useEffect(() => {
    let timer
    const advance = () => {
      setPhase((p) => {
        switch (p) {
          case 'intro': return 'open'
          case 'open': return 'zoom'
          case 'zoom': return 'search'
          case 'search': return 'preview'
          default: return 'intro'
        }
      })
    }

    const durations = {
      intro: 1600,
      open: 1200,
      zoom: 1200,
      search: 1600,
      preview: 2200,
    }

    timer = setTimeout(() => {
      advance()
      sequenceRef.current += 1
    }, durations[phase])

    return () => clearTimeout(timer)
  }, [phase])

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.8])
  const scaleBg = useTransform(scrollYProgress, [0, 0.2], [1, 1.02])

  const typed = useTypewriter([
    ...sampleQueries.map(q => `${q}\n`),
  ], 42, 700)

  const currentLine = useMemo(() => {
    const parts = typed.split('\n')
    return parts[parts.length - 1] || ''
  }, [typed])

  const fakeResults = useMemo(() => {
    const q = currentLine.toLowerCase()
    const base = [
      { title: 'Signal-ranked results • Arcyn Find', url: 'arcyn://find', desc: 'Real-time indexing across models, agents, repos and papers.' },
      { title: 'Latest model evals', url: 'https://evals.arcyn.ai', desc: 'Fresh benchmarks, side-by-sides and quality trends.' },
      { title: 'RAG best practices • GitHub', url: 'https://github.com/topics/rag', desc: 'Top repos and patterns for fast, accurate retrieval.' },
      { title: 'Compare models live', url: 'https://play.arcyn.ai', desc: 'Try prompts across models with identical context.' },
    ]
    const salt = q.length % base.length
    return [...base.slice(salt), ...base.slice(0, salt)]
  }, [currentLine])

  const showBrowser = phase === 'zoom' || phase === 'search' || phase === 'preview'

  return (
    <section className="relative h-[120vh] md:h-[140vh] w-full overflow-hidden">
      {/* Crystal light background with blue/green energy */}
      <motion.div style={{ opacity, scale: scaleBg }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-cyan-50 to-emerald-50" />
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(circle at 20% 15%, rgba(59,130,246,0.15), transparent 45%), radial-gradient(circle at 80% 70%, rgba(16,185,129,0.18), transparent 40%)' }} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute top-1/3 -left-24 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
        </div>
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl mx-auto">
          {/* Scene: Boy opens computer */}
          <div className="relative h-[420px] md:h-[520px]">
            {/* Character + laptop silhouette */}
            <motion.div
              initial={false}
              animate={{
                opacity: phase === 'intro' || phase === 'open' ? 1 : 0,
                y: phase === 'open' ? -8 : 0,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="absolute inset-0 grid place-items-center"
            >
              <div className="flex flex-col items-center gap-4">
                {/* Head */}
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-200 to-emerald-200 border border-cyan-300/50 shadow-lg" />
                {/* Laptop closed -> opening */}
                <motion.div
                  animate={{ rotateX: phase === 'open' ? 0 : -75 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-32 w-56"
                >
                  {/* Base */}
                  <div className="absolute bottom-0 inset-x-0 h-5 rounded-xl bg-gradient-to-r from-cyan-200 to-emerald-200 shadow-[0_12px_50px_rgba(34,197,94,0.25)]" />
                  {/* Lid (screen) */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 h-28 w-[220px] rounded-xl border border-cyan-300/50 bg-white/70 backdrop-blur-md shadow-xl overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-white to-cyan-50" />
                  </div>
                </motion.div>
                <div className="text-sm text-slate-600">opening…</div>
              </div>
            </motion.div>

            {/* Camera zoom on screen -> Browser window */}
            <motion.div
              initial={false}
              animate={{
                scale: phase === 'zoom' ? 1.15 : phase === 'search' ? 1.2 : phase === 'preview' ? 1.25 : 0.9,
                opacity: showBrowser ? 1 : 0,
                y: showBrowser ? 0 : 20,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Stylized browser window */}
              <div className="relative rounded-2xl border border-cyan-200/60 bg-white/70 backdrop-blur-xl shadow-[0_0_120px_rgba(59,130,246,0.25)] overflow-hidden w-full max-w-5xl">
                {/* Top bar */}
                <div className="flex items-center gap-3 px-4 py-2 border-b border-cyan-200/60 text-slate-500 text-xs bg-white/60">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="flex-1 max-w-xl mx-auto">
                    <div className="rounded-lg bg-white/70 border border-cyan-200/60 px-3 py-1.5 text-slate-700 truncate">
                      https://find.arcyn.ai
                    </div>
                  </div>
                  <span className="text-slate-400">Arcyn</span>
                </div>

                {/* Search row */}
                <div className="px-4 md:px-6 py-4 md:py-5 border-b border-cyan-200/60 bg-white/60">
                  <div className="flex items-center gap-2 rounded-xl bg-white/70 border border-cyan-200/60 px-3 py-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-500"><path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="2"/></svg>
                    <div className="relative w-full font-mono text-sm md:text-base text-slate-800">
                      <span className="text-slate-500">search:</span>{' '}
                      <span>{phase === 'search' || phase === 'preview' ? (currentLine || 'typing…') : ''}</span>
                      {(phase === 'search' || phase === 'preview') && (
                        <span className="inline-block w-2 h-4 align-[-2px] bg-slate-800 animate-pulse ml-0.5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="p-4 md:p-6 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.06),transparent_60%)]">
                  <ul className="space-y-3">
                    {fakeResults.map((r, i) => (
                      <motion.li
                        key={r.url + i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: phase === 'preview' ? 1 : 0.6, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group rounded-xl border border-cyan-200/60 bg-white/70 hover:bg-white/90 transition-colors p-4"
                      >
                        <div className="text-sm text-cyan-600/80">{r.url}</div>
                        <div className="text-slate-900 font-medium mt-0.5">{r.title}</div>
                        <div className="text-slate-700 text-sm mt-1">{r.desc}</div>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-4 text-xs text-slate-600 flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    live indexing • low-latency • signal-ranked
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Title overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={false}
                animate={{ opacity: phase === 'intro' || phase === 'open' ? 1 : 0.95, y: showBrowser ? -180 : 0, scale: showBrowser ? 0.95 : 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                className="text-center px-6"
              >
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600 text-5xl md:text-7xl font-semibold tracking-tight drop-shadow-[0_0_40px_rgba(59,130,246,0.35)]">
                  Arcyn Find
                </h1>
                <p className="mt-4 text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
                  Discover the future of AI—instantly. Minimal. Intelligent. Beyond.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Soft vignette edges */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white via-white/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/60 to-transparent" />
      </div>
    </section>
  )
}
