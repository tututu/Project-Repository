'use client'

import { motion } from 'framer-motion'
import { Component, Palette, Ruler, Type } from 'lucide-react'

const nodes = [
  { icon: Palette, title: '色彩令牌', sub: 'primary / accent / muted' },
  { icon: Type, title: '字体系统', sub: 'font-sans / font-mono' },
  { icon: Ruler, title: '间距 & 圆角', sub: 'spacing scale / radius' },
  { icon: Component, title: '组件库', sub: 'shadcn/ui 组件树' },
]

export function ArchitectureDiagram() {
  return (
    <div className="relative flex flex-col gap-3">
      <div className="relative grid grid-cols-4 gap-3">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 hidden h-px w-full -translate-y-1/2 sm:block"
        >
          <line x1="0" y1="0" x2="100%" y2="0" stroke="var(--border)" strokeWidth="1" />
          <motion.line
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="6 10"
            animate={{ strokeDashoffset: [0, -32] }}
            transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          />
        </svg>

        {nodes.map((n, i) => (
          <motion.div
            key={n.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card/70 p-4 text-center"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-blue">
              <n.icon className="size-5 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium">{n.title}</span>
            <span className="font-mono text-xs text-muted-foreground">{n.sub}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mt-1 flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-xs text-accent"
      >
        统一输出 → 一致、可复用、可主题化的界面
      </motion.div>
    </div>
  )
}
