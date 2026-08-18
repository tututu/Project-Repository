'use client'

import { SlideShell } from '@/components/presentation/slide-shell'
import { Reveal } from '@/components/presentation/reveal'
import { ArchitectureDiagram } from './architecture-diagram'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const benchmarks = [
  { name: 'Primer', company: 'GitHub', idea: '开发者协作优先' },
  { name: 'Carbon', company: 'IBM', idea: '企业级一致性' },
  { name: 'Material 3', company: 'Google', idea: '个性化动态配色' },
  { name: 'Fluent UI', company: 'Microsoft', idea: '跨平台统一体验' },
  { name: 'Cloudscape', company: 'AWS', idea: '数据密集型控制台' },
]

export function DesignSystemSlide() {
  return (
    <SlideShell eyebrow="DESIGN SYSTEM">
      <div className="flex flex-col gap-6">
        <Reveal className="flex flex-col gap-3">
          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            设计系统：默认 shadcn，也能接入自己的规范
          </h2>
          <p className="max-w-3xl text-pretty text-base text-muted-foreground sm:text-lg">
            v0 不是随机拼界面。默认基于 shadcn/ui + Tailwind
            的令牌与组件生成；团队也可以通过自定义 Design System / Registry / Figma，把自家规范教给
            v0。
          </p>
        </Reveal>

        <Reveal>
          <ArchitectureDiagram />
        </Reveal>

        <Reveal className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">行业标杆作参照</h3>
              <p className="text-sm text-muted-foreground">
                帮助判断「好的设计系统长什么样」——不是 v0 内置可一键切换的五套皮肤。
              </p>
            </div>
            <span className="font-mono text-[10px] tracking-wider text-accent">
              参照 ≠ 内置
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.02]">
            <Table className="min-w-[560px]">
              <TableHeader>
                <TableRow className="border-white/[0.08] hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-foreground">设计系统</TableHead>
                  <TableHead className="text-xs font-semibold text-foreground">公司</TableHead>
                  <TableHead className="text-xs font-semibold text-foreground">核心理念</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {benchmarks.map((s) => (
                  <TableRow key={s.name} className="border-white/[0.06] hover:bg-white/[0.03]">
                    <TableCell className="font-medium text-foreground">{s.name}</TableCell>
                    <TableCell className="font-mono text-xs text-accent">{s.company}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{s.idea}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            想贴近某家风格：可用提示词指定公开组件库，或接入团队自己的组件与
            token；效果最稳的是「你们的设计系统」，而不是直接等同于 Primer / Carbon 等官方实现。
          </p>
        </Reveal>
      </div>
    </SlideShell>
  )
}
