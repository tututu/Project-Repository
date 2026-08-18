import { ArrowRight, CalendarDays, User } from 'lucide-react'
import { Reveal, RevealGroup } from '@/components/presentation/reveal'

export function CoverSlide() {
  return (
    <div className="relative flex w-full flex-col items-start overflow-hidden px-6 py-10 sm:px-12 sm:py-12 lg:px-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-blue opacity-[0.2] blur-[120px] animate-aurora-pulse"
      />

      <RevealGroup className="relative flex flex-col gap-7">

        <Reveal>
          <h1 className="text-balance font-sans text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            V0
            <br />
            <span className="text-gradient-blue">用自然语言构建界面</span>
          </h1>
        </Reveal>

        <Reveal>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            V0 是什么、能做什么，以及它如何改变我们做 UI 的方式
          </p>
        </Reveal>

        <Reveal className="mt-2 flex flex-wrap items-center gap-4 font-mono text-sm text-muted-foreground">
          <span className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5">
            <User className="size-3.5 text-accent" />
            分享人 · 张宇
          </span>
          <span className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5">
            <CalendarDays className="size-3.5 text-accent" />
            2026 年 8 月
          </span>
        </Reveal>
      </RevealGroup>
    </div>
  )
}
