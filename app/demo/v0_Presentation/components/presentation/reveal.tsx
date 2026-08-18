'use client'

import type { ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

export const revealContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" animate="show" variants={revealContainer} className={className}>
      {children}
    </motion.div>
  )
}

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={revealItem} className={className}>
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  index,
  children,
  className,
  baseDelay = 0.15,
}: {
  index: number
  children: ReactNode
  className?: string
  baseDelay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, delay: baseDelay + index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
