import { Blocks, Boxes, Copy, LayoutDashboard, Megaphone, Plug } from 'lucide-react'
import { SlideShell } from '@/components/presentation/slide-shell'
import { Reveal, StaggerItem } from '@/components/presentation/reveal'
import { MiniDemo } from './mini-demo'

const scenarios = [
  { icon: Boxes, title: '生成完整页面', example: '例：一句话生成产品官网首页' },
  { icon: Blocks, title: '复杂交互组件', example: '例：多步表单、拖拽排序看板' },
  { icon: Copy, title: '复刻现有网站', example: '例：截图输入，还原竞品页面' },
  { icon: LayoutDashboard, title: '搭建后台系统', example: '例：数据仪表盘、管理后台' },
  { icon: Megaphone, title: '生成营销落地页', example: '例：活动页、产品发布页' },
  { icon: Plug, title: 'API 对接概念验证', example: '例：快速验证第三方接口方案' },
]

export function UseCasesSlide() {
  return (
    <SlideShell eyebrow="WHAT CAN V0 DO">
      <div className="flex flex-col gap-5">
        <Reveal className="flex flex-col gap-3">
          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            v0 能做什么
          </h2>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            六个真实场景，覆盖从页面到系统的常见开发需求。
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {scenarios.map((s, i) => (
            <StaggerItem key={s.title} index={i} baseDelay={0.1}>
              <div className="flex flex-col gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:border-accent/30 hover:bg-white/[0.05]">
                <span className="flex size-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-accent">
                  <s.icon className="size-4.5" />
                </span>
                <span className="text-sm font-semibold text-foreground">{s.title}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">{s.example}</span>
              </div>
            </StaggerItem>
          ))}
        </div>

        <Reveal>
          <MiniDemo />
        </Reveal>
      </div>
    </SlideShell>
  )
}
