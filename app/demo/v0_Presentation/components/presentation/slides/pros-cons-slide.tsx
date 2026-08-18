import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { SlideShell } from '@/components/presentation/slide-shell'
import { Reveal, StaggerItem } from '@/components/presentation/reveal'

const pros = [
  '从想法到界面只需几分钟，大幅提升原型效率',
  '生成代码可直接投入生产，并非纯粹的原型',
  '内置设计系统，风格自动保持一致',
  '支持多轮对话迭代，越用越懂你的需求',
  '与 Vercel 生态无缝衔接，部署链路极短',
]

const cons = [
  '复杂业务逻辑仍需工程师人工把关',
  '对小众 / 私有组件库的还原效果有限',
  '生成结果依赖提示词质量，需要练习技巧',
  '大型项目上下文理解仍在持续优化中',
  '团队协作规范需要额外约定才能落地',
]

export function ProsConsSlide() {
  return (
    <SlideShell eyebrow="STRENGTHS & LIMITATIONS">
      <div className="flex flex-col gap-8">
        <Reveal>
          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            V0 的优势与局限
          </h2>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-2xl border border-accent/20 bg-accent/[0.05] p-5 lg:p-6">
            <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-accent">
              <ThumbsUp className="size-3.5" />
              核心优势
            </div>
            <ul className="flex flex-col gap-3">
              {pros.map((p, i) => (
                <StaggerItem key={p} index={i} baseDelay={0.15}>
                  <li className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                </StaggerItem>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 lg:p-6">
            <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-muted-foreground">
              <ThumbsDown className="size-3.5" />
              客观局限
            </div>
            <ul className="flex flex-col gap-3">
              {cons.map((c, i) => (
                <StaggerItem key={c} index={i} baseDelay={0.2}>
                  <li className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-white/25" />
                    {c}
                  </li>
                </StaggerItem>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
