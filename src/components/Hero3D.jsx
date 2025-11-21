import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const sampleQueries = [
  'search: "best GPT-4o prompts"',
  'find agents where rating > 4.7',
  'models tag:vision sort:quality',
  'compare claude-3.5 vs gpt-4o',
  'index updates since:24h',
  'source:github topic:rag',
]

function useTypewriter(lines, speed = 40, pause = 900) {
  const [display, setDisplay] = useState('')
  const full = useMemo(() => lines.join('\n'), [lines])
  useEffect(() => {
    let i = 0
    let mounted = true
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
    let timer = setTimeout(tick, 400)
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
  const display = useTypewriter(
    [
      'arcyn://console\n',
      ...sampleQueries.map(q => `$> ${q}\n`),
      '$> searching…\n',
      '$> 18 matches found\n',
    ],
    32,
    700
  )

  return (
    <section className="relative h-[120vh] md:h-[140vh] w-full overflow-hidden">
      <motion.div style={{ opacity, scale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(169,107,255,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(88,101,242,0.15), transparent 35%)' }} />
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-full max-w-4xl mx-auto">
            <div className="relative rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur-xl shadow-[0_0_120px_rgba(169,107,255,0.25)] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 text-white/60 text-xs">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-2">Arcyn Console</span>
              </div>
              <div className="p-4 md:p-6 font-mono text-[12px] md:text-sm leading-relaxed text-white/90 min-h-[42vh] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.04),transparent_60%)]">
                <pre className="whitespace-pre-wrap">
                  {display}
                  <span className="inline-block w-2 h-4 align-[-2px] bg-white/90 animate-pulse" />
                </pre>
              </div>
              <div className="px-4 py-3 border-t border-white/10 text-white/60 text-xs flex items-center justify-between">
                <span>live indexing • low-latency • signal-ranked</span>
                <span className="text-white/40">arcyn://find</span>
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
