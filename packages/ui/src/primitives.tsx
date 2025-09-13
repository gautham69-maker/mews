import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import clsx from 'clsx'

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('card p-5', className)}>{children}</div>
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={clsx(
      'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
      className
    )}>
      {children}
    </span>
  )
}

export const spring = { type: 'spring', stiffness: 380, damping: 30 }
export const FadeIn: React.FC<{ children: ReactNode }> = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
    {children}
  </motion.div>
)
