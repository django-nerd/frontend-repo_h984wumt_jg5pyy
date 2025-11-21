import { useState } from 'react'
import { Mail, Github, Chrome, CheckCircle2, Loader2 } from 'lucide-react'

const apiBase = import.meta.env.VITE_BACKEND_URL || ''

export default function AuthInline() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [session, setSession] = useState(null)

  const fetchSession = async () => {
    try {
      const res = await fetch(`${apiBase}/auth/session`, { credentials: 'include' })
      const data = await res.json()
      if (data?.ok && data.session) {
        const exp = data.session.expires_at
        setSession({ expires_at: exp })
        return true
      }
    } catch (e) {}
    return false
  }

  const startEmail = async (e) => {
    e?.preventDefault()
    if (!email) return
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${apiBase}/auth/email/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.detail || 'Failed to start')
      setSent(true)
      if (data?.code) setCode(data.code)
      setMessage('We sent a 6‑digit code to your email.')
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  const verifyEmail = async (e) => {
    e?.preventDefault()
    if (!email || !code) return
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${apiBase}/auth/email/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok || !data?.ok) throw new Error(data?.detail || 'Invalid code')
      // cookie is set httpOnly; fetch session for UI
      await fetchSession()
      setMessage('Signed in ✓')
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  const oauth = (provider) => {
    // Use full-page redirect to backend start endpoint for production OAuth
    const url = `${apiBase}/auth/oauth/start?provider=${encodeURIComponent(provider)}`
    window.location.href = url
  }

  if (session) {
    return (
      <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-white">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-emerald-400" />
          <div>
            <div className="font-semibold">You are signed in</div>
            <div className="text-white/60 text-sm">Session expires {new Date(session.expires_at).toLocaleString()}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-purple-500/40 to-indigo-500/40 blur opacity-70" />
      <div className="relative rounded-3xl border border-white/10 bg-neutral-900/70 backdrop-blur-xl p-6 md:p-8 text-white">
        <h3 className="text-2xl font-semibold">Join Arcyn Find</h3>
        <p className="text-white/70 mt-1">Sign in to personalize your AI discovery.</p>

        {!sent ? (
          <form onSubmit={startEmail} className="mt-5 space-y-3">
            <div className="rounded-xl bg-black/30 border border-white/10 p-2 flex items-center gap-3">
              <Mail className="h-5 w-5 text-white/60" />
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-transparent outline-none w-full text-white placeholder:text-white/40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 px-4 py-3 font-medium transition-all">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Mail className="h-5 w-5" />} Send magic code
            </button>
          </form>
        ) : (
          <form onSubmit={verifyEmail} className="mt-5 space-y-3">
            <div className="rounded-xl bg-black/30 border border-white/10 p-2 flex items-center gap-3">
              <span className="text-white/60 text-sm">Code</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                className="bg-transparent outline-none w-full text-white tracking-widest text-lg placeholder:text-white/40"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
            <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 px-4 py-3 font-medium transition-all">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle2 className="h-5 w-5" />} Verify & continue
            </button>
          </form>
        )}

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          <button onClick={() => oauth('google')} disabled={loading} className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#4285F4] hover:bg-[#3877e6] text-white px-4 py-3 font-medium transition-all">
            <Chrome className="h-5 w-5" /> Continue with Google
          </button>
          <button onClick={() => oauth('github')} disabled={loading} className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#24292e] hover:bg-black text-white px-4 py-3 font-medium transition-all">
            <Github className="h-5 w-5" /> Continue with GitHub
          </button>
        </div>

        {message && <p className="mt-4 text-sm text-white/70">{message}</p>}
        <p className="mt-3 text-xs text-white/50">By continuing you agree to our Terms and acknowledge our Privacy Policy.</p>
      </div>
    </div>
  )
}
