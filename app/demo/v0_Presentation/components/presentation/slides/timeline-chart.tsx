'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const data = [
  { period: '2023 Q4', capability: 12, label: '首个公开版本' },
  { period: '2024 Q2', capability: 28, label: '支持组件生态接入' },
  { period: '2024 Q4', capability: 47, label: '多模态输入 / 截图还原' },
  { period: '2025 Q2', capability: 68, label: '项目级上下文理解' },
  { period: '2025 Q4', capability: 86, label: '集成部署与团队协作' },
  { period: '2026 Q2', capability: 100, label: '端到端生产流程' },
]

const chartConfig = {
  capability: {
    label: '能力成熟度',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

export function TimelineChart() {
  return (
    <ChartContainer config={chartConfig} className="h-56 w-full">
      <AreaChart data={data} margin={{ left: 4, right: 12, top: 8 }}>
        <defs>
          <linearGradient id="fillCapability" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-capability)" stopOpacity={0.5} />
            <stop offset="95%" stopColor="var(--color-capability)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="period"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={11}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(_, payload) => payload?.[0]?.payload?.label}
            />
          }
        />
        <Area
          dataKey="capability"
          type="monotone"
          fill="url(#fillCapability)"
          stroke="var(--color-capability)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  )
}
