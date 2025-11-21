import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const sampleQueries = [
  'best GPT-4o prompts for research',
  'agents rating > 4.7 sort:signal',
  'models tag:vision sort:quality',
  'compare claude-3.5 vs gpt-4o',
  'index updates since:24h',
  'source:github topic:rag',
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
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.5])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05])

  const typed = useTypewriter([
    ...sampleQueries.map(q => `${q}\n`),
  ], 30, 800)

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
    // Light shuffle based on query
    const salt = q.length % base.length
    return [...base.slice(salt), ...base.slice(0, salt)]
  }, [currentLine])

  return (
    <section className="relative h-[120vh] md:h-[140vh] w-full overflow-hidden">
      <motion.div style={{ opacity, scale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(169,107,255,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(88,101,242,0.15), transparent 35%)' }} />
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-full max-w-5xl mx-auto">
            {/* Browser window */}
            <div className="relative rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur-xl shadow-[0_0_120px_rgba(169,107,255,0.25)] overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center gap-3 px-4 py-2 border-b border-white/10 text-white/70 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="flex-1 max-w-xl mx-auto">
                  <div className="rounded-lg bg-black/50 border border-white/10 px-3 py-1.5 text-white/80 truncate">
                    https://find.arcyn.ai
                  </div>
                </div>
                <span className="text-white/40">Arcyn</span>
              </div>

              {/* Search row */}
              <div className="px-4 md:px-6 py-4 md:py-5 border-b border-white/10">
                <div className="flex items-center gap-2 rounded-xl bg-black/40 border border-white/10 px-3 py-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/60"><path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="2"/></svg>
                  <div className="relative w-full font-mono text-sm md:text-base text-white/90">
                    <span className="text-white/60">search:</span>{' '}
                    <span>{currentLine || 'typing…'}</span>
                    <span className="inline-block w-2 h-4 align-[-2px] bg-white/90 animate-pulse ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="p-4 md:p-6 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.04),transparent_60%)]">
                <ul className="space-y-3">
                  {fakeResults.map((r, i) => (
                    <motion.li
                      key={r.url + i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors p-4"
                    >
                      <div className="text-sm text-white/50">{r.url}</div>
                      <div className="text-white font-medium mt-0.5">{r.title}</div>
                      <div className="text-white/70 text-sm mt-1">{r.desc}</div>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-4 text-xs text-white/50 flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  live indexing • low-latency • signal-ranked
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black via-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-white text-5xl md:text-7xl font-semibold tracking-tight drop-shadow-[0_0_60px_rgba(169,107,255,0.4)]">
            Arcyn Find
          </h1>
          <p className="mt-4 text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Discover the future of AI—instantly. Minimal. Intelligent. Beyond.
          </p>
        </div>
      </div>
    </section>
  )
}
