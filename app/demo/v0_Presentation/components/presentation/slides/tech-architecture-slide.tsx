'use client'

import { motion } from 'framer-motion'
import { BrainCircuit, Cpu, ScanEye, Terminal } from 'lucide-react'
import { SlideShell } from '@/components/presentation/slide-shell'
import { Reveal } from '@/components/presentation/reveal'

const layers = [
  {
    icon: Terminal,
    title: 'NLP 自然语言处理层',
    desc: '理解用户用自然语言描述的界面需求与业务意图，拆解为可执行的生成任务。',
  },
  {
    icon: ScanEye,
    title: '计算机视觉层',
    desc: '解析截图、Figma 稿件等视觉输入，识别布局结构、色彩与组件关系。',
  },
  {
    icon: BrainCircuit,
    title: '生成模型层',
    desc: '基于大模型将理解结果转化为符合设计规范的界面结构与交互逻辑。',
  },
  {
    icon: Cpu,
    title: '代码执行引擎层',
    desc: '实时编译、运行并预览生成的代码，确保产出即是可运行的真实应用。',
  },
]

export function TechArchitectureSlide() {
  return (
    <SlideShell eyebrow="TECHNICAL ARCHITECTURE">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal className="flex flex-col gap-4">
          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            V0 的核心技术架构
          </h2>
          <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            四层能力协同工作，把一句话、一张截图，逐层转化为可运行的生产级界面。
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
            <span className="font-mono text-xs tracking-wider text-muted-foreground">底层技术栈</span>
            {['React', 'Tailwind CSS', 'shadcn/ui'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-accent/25 bg-accent/[0.08] px-2.5 py-1 font-mono text-xs text-accent"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="relative flex flex-col gap-3">
          {layers.map((l, i) => (
            <motion.div
              key={l.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.13, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-start gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:border-accent/30"
            >
              <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-blue">
                <l.icon className="size-5 text-primary-foreground" />
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-foreground">{l.title}</span>
                <span className="text-pretty text-xs leading-relaxed text-muted-foreground">
                  {l.desc}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
