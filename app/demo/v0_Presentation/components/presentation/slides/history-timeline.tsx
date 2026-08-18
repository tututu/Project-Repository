'use client'

import { motion } from 'framer-motion'

const milestones = [
  { year: '2023', text: '发布 v0.dev 早期版本，专注单组件生成' },
  { year: '2024 H1', text: '集成 shadcn/ui，支持多轮对话式迭代' },
  { year: '2024 H2', text: '支持截图 / Figma 还原，接入多模态输入' },
  { year: '2025 H1', text: '项目级上下文理解，支持全栈应用生成' },
  { year: '2025 H2', text: '与 Vercel 部署深度打通，一键上线' },
  { year: '2026', text: '迈向“从想法到生产”的端到端流程' },
]

export function HistoryTimeline() {
  return (
    <div className="relative">
      <div className="relative hidden lg:block">
        <div className="absolute left-0 right-0 top-[15px] h-px bg-white/[0.08]" />
        <motion.div
          className="absolute left-0 top-[15px] h-px bg-gradient-blue"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="grid grid-cols-6 gap-4">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col gap-3"
            >
              <span className="relative z-10 size-[9px] rounded-full bg-gradient-blue shadow-[0_0_10px_var(--accent)]" />
              <span className="font-mono text-xs font-semibold text-accent">{m.year}</span>
              <p className="text-pretty text-[13px] leading-relaxed text-muted-foreground">{m.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <ol className="flex flex-col gap-4 lg:hidden">
        {milestones.map((m, i) => (
          <motion.li
            key={m.year}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.45 }}
            className="flex gap-3"
          >
            <span className="mt-1 flex flex-col items-center">
              <span className="size-[9px] rounded-full bg-gradient-blue shadow-[0_0_10px_var(--accent)]" />
              {i < milestones.length - 1 && <span className="mt-1 w-px flex-1 bg-white/[0.08]" />}
            </span>
            <span className="flex flex-col gap-1 pb-1">
              <span className="font-mono text-xs font-semibold text-accent">{m.year}</span>
              <span className="text-pretty text-sm leading-relaxed text-muted-foreground">{m.text}</span>
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
