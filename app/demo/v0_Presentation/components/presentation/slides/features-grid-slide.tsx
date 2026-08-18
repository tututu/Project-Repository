import {
  Boxes,
  Camera,
  Cloud,
  Database,
  GitBranch,
  History,
  Layers,
  LayoutTemplate,
  MessageSquare,
  Smartphone,
  SquareCode,
  Users,
} from 'lucide-react'
import { SlideShell } from '@/components/presentation/slide-shell'
import { Reveal } from '@/components/presentation/reveal'
import { StaggerItem } from '@/components/presentation/reveal'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const features = [
  { icon: MessageSquare, name: '自然语言生成 UI', detail: '用一句话描述需求，即可生成完整界面' },
  { icon: Camera, name: '截图 / 图片还原', detail: '上传设计图或截图，直接复刻还原' },
  { icon: LayoutTemplate, name: 'Figma 设计导入', detail: '读取 Figma 图层结构，还原真实布局' },
  { icon: History, name: '多轮对话迭代', detail: '持续对话式微调，越改越贴合需求' },
  { icon: Boxes, name: '内置 shadcn/ui', detail: '生成结果直接复用成熟组件库' },
  { icon: Smartphone, name: '响应式布局', detail: '自动适配桌面、平板与移动端' },
  { icon: SquareCode, name: '真实可运行代码', detail: '产出的是生产级代码，非静态原型' },
  { icon: Cloud, name: '一键部署上线', detail: '与 Vercel 无缝集成，即刻发布' },
  { icon: Database, name: '数据库 / API 接入', detail: '快速搭建带真实数据的全栈逻辑' },
  { icon: Layers, name: '版本历史回溯', detail: '每一次修改均可追溯、可还原' },
  { icon: Users, name: '团队协作与分享', detail: '多人可协同编辑同一个项目' },
  { icon: GitBranch, name: 'GitHub 仓库同步', detail: '代码可直接推送到仓库管理' },
]

export function FeaturesGridSlide() {
  return (
    <SlideShell eyebrow="12 CORE CAPABILITIES">
      <div className="flex flex-col gap-6">
        <Reveal className="flex flex-col gap-3">
          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            v0 的 12 大核心功能
          </h2>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            鼠标悬停查看每项功能的详细说明。
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {features.map((f, i) => (
            <StaggerItem key={f.name} index={i} baseDelay={0.1}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <div className="group flex cursor-default flex-col gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 transition-all hover:-translate-y-0.5 hover:border-accent/35 hover:bg-white/[0.05]" />
                  }
                >
                  <span className="flex size-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-accent transition-colors group-hover:border-accent/40">
                    <f.icon className="size-4" />
                  </span>
                  <span className="text-xs font-medium leading-snug text-foreground sm:text-[13px]">
                    {f.name}
                  </span>
                </TooltipTrigger>
                <TooltipContent>{f.detail}</TooltipContent>
              </Tooltip>
            </StaggerItem>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
