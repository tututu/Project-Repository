import { Briefcase, Code2, GraduationCap, Palette } from 'lucide-react'
import { SlideShell } from '@/components/presentation/slide-shell'
import { Reveal, StaggerItem } from '@/components/presentation/reveal'

const personas = [
  {
    icon: Code2,
    title: '前端开发者',
    scenario: '快速搭建页面骨架，把时间留给核心业务逻辑',
    value: '减少重复的样板代码编写，专注真正有难度的问题',
  },
  {
    icon: Palette,
    title: '产品经理 / 设计师',
    scenario: '把想法直接变成可点击的高保真原型',
    value: '不依赖工程排期即可验证交互与视觉方向',
  },
  {
    icon: Briefcase,
    title: '创业团队',
    scenario: '用极小的团队快速验证 MVP，抓住窗口期',
    value: '以更低成本、更快速度完成从想法到上线',
  },
  {
    icon: GraduationCap,
    title: '教学培训人群',
    scenario: '现场演示前端开发流程，降低学习门槛',
    value: '让初学者直观理解代码与界面的对应关系',
  },
]

export function AudienceSlide() {
  return (
    <SlideShell eyebrow="WHO SHOULD USE V0">
      <div className="flex flex-col gap-6">
        <Reveal className="flex flex-col gap-3">
          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            V0 的 4 大典型应用人群
          </h2>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            不同角色，都能在 v0 中找到适合自己的使用方式。
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {personas.map((p, i) => (
            <StaggerItem key={p.title} index={i} baseDelay={0.1}>
              <div className="flex h-full flex-col gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-accent/30">
                <span className="flex size-10 items-center justify-center rounded-lg bg-gradient-blue">
                  <p.icon className="size-5 text-primary-foreground" />
                </span>
                <span className="text-base font-semibold text-foreground">{p.title}</span>
                <div className="flex flex-col gap-1.5 text-sm leading-relaxed text-muted-foreground">
                  <span>
                    <span className="text-foreground/80">场景：</span>
                    {p.scenario}
                  </span>
                  <span>
                    <span className="text-foreground/80">价值：</span>
                    {p.value}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
