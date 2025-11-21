import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AuthInline from './AuthInline'

const Frame = ({ index, title, subtitle, children, id }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1])
  const y = useTransform(scrollYProgress, [0, 1], [80, 0])

  return (
    <section ref={ref} id={id} className="relative h-screen flex items-center justify-center">
      <motion.div style={{ opacity, y }} className="relative w-full max-w-6xl mx-auto px-6">
        <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_80px_rgba(169,107,255,0.18)]">
          <div className="absolute -inset-px rounded-3xl pointer-events-none" style={{
            background: 'radial-gradient(200px_120px_at_0%_0%,rgba(169,107,255,0.25),transparent), radial-gradient(200px_120px_at_100%_100%,rgba(169,107,255,0.2),transparent)'
          }} />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white drop-shadow-[0_0_20px_rgba(169,107,255,0.2)]">{title}</h2>
            {subtitle && <p className="mt-3 text-white/70 text-lg max-w-2xl">{subtitle}</p>}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {children}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default function ScrollFrames({ onHalfway }) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({ container: undefined })
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v > 0.5) onHalfway?.()
    })
    return () => unsub()
  }, [scrollYProgress, onHalfway])

  return (
    <div ref={container} className="relative z-10">
      <Frame title="Discover AI Tools Instantly" subtitle="Find the right model, agent, or workflow in seconds with precision ranking.">
        <Panel title="Speed" desc="Real-time indexing across the AI ecosystem."/>
        <Panel title="Precision" desc="Signals tuned for quality and usefulness."/>
      </Frame>

      <Frame title="Smart Search. Clean Results." subtitle="A search experience designed for focus—no noise, just answers.">
        <div className="col-span-1 md:col-span-2">
          <div className="relative group">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-500/50 to-indigo-500/50 blur opacity-60 group-hover:opacity-90 transition" />
            <div className="relative rounded-2xl bg-neutral-900/80 border border-white/10 p-4 md:p-6 backdrop-blur">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <span>arcyn://query</span>
              </div>
              <div className="mt-3 rounded-xl bg-black/30 border border-white/10 p-4 text-white/80">Search anything… models, prompts, agents</div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-white/80">
                {['Claude 3.5 Sonnet','GPT-4o','Llama 3.1 70B'].map((t)=> (
                  <div key={t} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center hover:bg-white/10 transition">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Frame>

      <Frame title="Upcoming Features" subtitle="Profiles, Collections, Reviews, Followings">
        <Panel title="Profiles" desc="Curate your AI presence."/>
        <Panel title="Collections" desc="Save and organize the best tools."/>
        <Panel title="Reviews" desc="Signal quality through community."/>
        <Panel title="Followings" desc="Track creators and updates."/>
      </Frame>

      <Frame id="auth-frame" title="Create your Arcyn profile" subtitle="Sign in to save, follow, and sync across devices.">
        <div className="col-span-1 md:col-span-2">
          <AuthInline />
        </div>
      </Frame>

      <Frame title="Powered by Arcyn OS" subtitle="A lightweight, futuristic OS layer for AI discovery.">
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Apps','Search','Profiles','Collections','Reviews','Settings','Console','Store'].map((a)=> (
                <div key={a} className="rounded-xl bg-neutral-900/70 border border-white/10 p-4 text-white text-center hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(169,107,255,0.3)] transition will-change-transform">
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Frame>

      <CTAFrame />
    </div>
  )
}

const Panel = ({ title, desc }) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-500/30 to-indigo-500/30 blur opacity-50 group-hover:opacity-80 transition" />
    <div className="relative rounded-2xl bg-neutral-900/70 border border-white/10 p-6 backdrop-blur-xl text-white">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-white/70 mt-2">{desc}</p>
    </div>
  </div>
)

const CTAFrame = () => (
  <section className="relative h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-4xl md:text-6xl font-semibold text-white">Ready to enter?</h2>
      <p className="text-white/70 mt-4">Experience Arcyn Find now.</p>
      <a href="#" className="mt-8 inline-flex items-center rounded-2xl px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_60px_rgba(169,107,255,0.5)] hover:shadow-[0_0_90px_rgba(169,107,255,0.7)] transition">
        Enter Arcyn Find
      </a>
    </div>
  </section>
)
