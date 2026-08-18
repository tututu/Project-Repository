import { ExternalLink } from 'lucide-react'
import { SlideShell } from '@/components/presentation/slide-shell'
import { Reveal, StaggerItem } from '@/components/presentation/reveal'

const takeaways = [
  {
    label: '它是什么',
    text: 'Vercel 推出的 AI UI 工具：用自然语言描述需求，生成可运行的界面与代码。',
  },
  {
    label: '它能干什么',
    text: '一句话出页面、截图/Figma 还原、多轮改稿、按设计系统出一致风格，并可对接部署。',
  },
  {
    label: '能解决什么',
    text: '把「想法到可见界面」从几天压到几分钟，减少低效手搓原型和反复对齐的成本。',
  },
  {
    label: '对团队有什么用',
    text: '前端可快速起稿，产品可更早验证方案，协作时先有可点的界面再谈细节——适合作为日常做 UI 的默认起点。',
  },
]

const links = [
  { label: '打开 v0.app 试用', href: 'https://v0.app' },
  { label: 'Design Systems 文档', href: 'https://v0.app/docs/design-systems-2' },
]

export function SummarySlide() {
  return (
    <SlideShell eyebrow="WRAP UP">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <Reveal>
            <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              关于 v0，记住这些就够了
            </h2>
          </Reveal>

          <ol className="flex flex-col gap-3.5">
            {takeaways.map((item, i) => (
              <StaggerItem key={item.label} index={i} baseDelay={0.08}>
                <li className="flex gap-3.5">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-blue font-mono text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-sm font-semibold text-foreground">{item.label}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{item.text}</span>
                  </div>
                </li>
              </StaggerItem>
            ))}
          </ol>
        </div>

        <Reveal className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs tracking-wider text-accent">NEXT</span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              打开官网，用一个真实需求试一轮；有问题现在聊。
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-border bg-background/50 px-4 py-3 text-sm transition-colors hover:border-accent/50"
              >
                <span className="font-medium text-foreground">{l.label}</span>
                <ExternalLink className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
          <p className="font-mono text-[11px] tracking-wide text-muted-foreground/80">Q & A</p>
        </Reveal>
      </div>
    </SlideShell>
  )
}
