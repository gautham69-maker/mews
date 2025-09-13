import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  safelist: [
    'bg-gradient-to-br','from-sky-100','via-indigo-100','to-emerald-100',
    'grid','grid-cols-8','grid-rows-5',
    'border','border-white/60','border-white/70',
    'opacity-40','opacity-50',
    'rotate-[4deg]','-rotate-[8deg]','rotate-[2deg]',
    '-translate-x-1/2','rounded-full','rounded-xl','h-80'
  ],
  theme: { extend: {} },
  plugins: []
} satisfies Config
