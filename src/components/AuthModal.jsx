import { useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Mail, Github, Chrome } from 'lucide-react'

export default function AuthModal({ open, onOpenChange }) {
  useEffect(() => {
    // focus lock handled by Radix
  }, [open])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md rounded-2xl border border-white/10 bg-white/8 bg-clip-padding p-6 text-white shadow-[0_0_60px_rgba(169,107,255,0.35)] backdrop-blur-2xl">
          <div className="absolute -inset-px rounded-2xl pointer-events-none" style={{
            background: 'radial-gradient(120px 120px at 10% 0%, rgba(169,107,255,0.35), transparent), radial-gradient(200px 200px at 100% 100%, rgba(169,107,255,0.25), transparent)'
          }} />
          <div className="relative">
            <Dialog.Title className="text-2xl font-semibold mb-1">Welcome to Arcyn Find</Dialog.Title>
            <Dialog.Description className="text-white/70 mb-6">Sign in to personalize your AI discovery experience.</Dialog.Description>

            <div className="space-y-3">
              <button className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 px-4 py-3 font-medium transition-all shadow-[0_10px_50px_rgba(255,255,255,0.05)]">
                <Mail className="h-5 w-5" /> Continue with Email
              </button>
              <button className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-[#4285F4] hover:bg-[#3877e6] text-white px-4 py-3 font-medium transition-all">
                <Chrome className="h-5 w-5" /> Continue with Google
              </button>
              <button className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-[#24292e] hover:bg-black text-white px-4 py-3 font-medium transition-all">
                <Github className="h-5 w-5" /> Continue with GitHub
              </button>
            </div>

            <p className="mt-6 text-xs text-white/50">By continuing you agree to our Terms and acknowledge our Privacy Policy.</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
