'use client'

import { motion } from 'framer-motion'
import { Blocks, Palette, ShieldCheck } from 'lucide-react'
import { SlideShell } from '@/components/presentation/slide-shell'
import { Reveal } from '@/components/presentation/reveal'

const layers = [
  {
    icon: ShieldCheck,
    title: '规范约束层',
    desc: '团队级的品牌规范与可访问性约束，决定什么能用、什么不能用。',
    ring: 'outer',
  },
  {
    icon: Blocks,
    title: '组件库层',
    desc: 'shadcn/ui 组件树，把原子样式组合为可复用的界面模块。',
    ring: 'middle',
  },
  {
    icon: Palette,
    title: '原子化样式层',
    desc: '色彩、字体、间距与圆角令牌，一切界面的最小构成单位。',
    ring: 'inner',
  },
]

export function DesignLayersSlide() {
  return (
    <SlideShell eyebrow="DESIGN SYSTEM">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal className="flex flex-col gap-4">
          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            V0 的设计系统详解
          </h2>
          <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            设计系统由内向外分为三层——原子样式是基础，组件库负责组合，规范约束层守住边界，三层共同保证每次生成都风格一致。
          </p>
          <ul className="mt-2 flex flex-col gap-3">
            {layers.map((l) => (
              <li key={l.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] text-accent">
                  <l.icon className="size-3.5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">{l.title}</span>
                  <span className="text-xs leading-relaxed text-muted-foreground">{l.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 rounded-[32%] border border-white/[0.08] bg-white/[0.015]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-[14%] rounded-[30%] border border-white/[0.12] bg-white/[0.025]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glow-ring absolute inset-[30%] flex items-center justify-center rounded-[28%] bg-gradient-blue"
          >
            <Palette className="size-7 text-primary-foreground" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute left-1/2 top-[6%] -translate-x-1/2 font-mono text-[10px] tracking-wider text-muted-foreground"
          >
            规范约束层
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute left-1/2 top-[20%] -translate-x-1/2 font-mono text-[10px] tracking-wider text-muted-foreground"
          >
            组件库层
          </motion.span>
        </div>
      </div>
    </SlideShell>
  )
}
