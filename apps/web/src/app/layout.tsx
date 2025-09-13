import './globals.css'
import { ReactNode } from 'react'

function Logo({ className = 'h-9 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 40" className={className} aria-label="SATYA Portal">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6EE7F9" />
          <stop offset="0.5" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#F472B6" />
        </linearGradient>
      </defs>
      <text x="4" y="28" fontFamily="Inter, system-ui" fontWeight="800" fontSize="22" fill="url(#g)">SATYA</text>
      <text x="108" y="28" fontFamily="Inter, system-ui" fontWeight="600" fontSize="18" fill="#0f172a">Portal</text>
    </svg>
  )
}

export const metadata = { title: 'SATYA Portal', description: 'Layout verification mock' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-tr from-pink-200 via-purple-200 to-blue-200 antialiased">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-white/50">
          <div className="mx-auto max-w-6xl px-4 py-2.5 flex items-center justify-between">
            <Logo className="h-9 w-auto" />
            <span className="hidden sm:block text-sm text-slate-500">Milestone 3 — Mock UI</span>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">{children}</main>
      </body>
    </html>
  )
}
