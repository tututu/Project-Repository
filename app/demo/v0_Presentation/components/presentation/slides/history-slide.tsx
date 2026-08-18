import { SlideShell } from '@/components/presentation/slide-shell'
import { Reveal } from '@/components/presentation/reveal'
import { HistoryTimeline } from './history-timeline'

export function HistorySlide() {
  return (
    <SlideShell eyebrow="ORIGIN STORY">
      <div className="flex flex-col gap-10">
        <Reveal className="flex flex-col gap-4">
          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            V0 的历史与由来
          </h2>
          <p className="max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            v0 是 Vercel 在 2023 年推出的 AI 生成式 UI 开发工具，从最初的
            <span className="text-foreground">单组件生成</span>，逐步迭代为
            <span className="text-foreground">全栈应用构建平台</span>
            ，目标是把「想法到可用界面」的周期从几天压缩到几分钟。
          </p>
        </Reveal>

        <Reveal className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 lg:p-8">
          <HistoryTimeline />
        </Reveal>
      </div>
    </SlideShell>
  )
}
