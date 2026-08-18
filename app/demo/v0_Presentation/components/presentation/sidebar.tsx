'use client'

import { motion } from 'framer-motion'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SlideDefinition } from './types'

interface SidebarProps {
  slides: SlideDefinition[]
  current: number
  onSelect: (index: number) => void
  collapsed: boolean
  onToggleCollapsed: () => void
}

export function Sidebar({ slides, current, onSelect, collapsed, onToggleCollapsed }: SidebarProps) {
  if (collapsed) {
    return (
      <nav
        aria-label="分享大纲（已收起）"
        style={{ lineHeight: 3.2 }}
        className="relative z-30 hidden h-full w-[44px] shrink-0 flex-col items-center border-r border-white/[0.06] bg-[oklch(0.06_0.01_258)]/80 backdrop-blur-2xl md:flex"
      >
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label="展开侧边栏"
          className="mt-4 flex shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] p-1.5 text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
        >
          <PanelLeftOpen className="size-3.5" />
        </button>
        <div className="mt-6 flex-1 [writing-mode:vertical-rl]">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground/80">
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </nav>
    )
  }

  return (
    <nav
      aria-label="分享大纲"
      className="relative z-30 hidden h-full w-[76px] shrink-0 flex-col border-r border-white/[0.06] bg-[oklch(0.06_0.01_258)]/80 backdrop-blur-2xl md:flex lg:w-[264px]"
    >
      <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-4 py-5 lg:px-6">
        <div className="glow-ring flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-blue">
          <span className="font-mono text-xs font-bold text-primary-foreground">v0</span>
        </div>
        <div className="hidden min-w-0 flex-col lg:flex">
          <span className="truncate text-sm font-semibold leading-tight text-foreground">分享大纲</span>
          <span className="truncate font-mono text-[10px] tracking-wider text-muted-foreground">
            {slides.length} SLIDES
          </span>
        </div>
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label="收起侧边栏"
          className="ml-auto hidden shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] p-1.5 text-muted-foreground transition-colors hover:border-white/[0.16] hover:text-foreground lg:flex"
        >
          <PanelLeftClose className="size-3.5" />
        </button>
      </div>

      <ul
        data-wheel-scrollable
        className="scrollbar-none flex flex-1 flex-col gap-1 overflow-y-auto px-2.5 py-3 lg:px-3"
      >
        {slides.map((slide, i) => {
          const isActive = i === current
          return (
            <li key={slide.id} className="relative">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={isActive}
                className={cn(
                  'group relative flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors lg:px-3',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    transition={{ type: 'spring', stiffness: 420, damping: 38 }}
                    className="absolute inset-0 rounded-xl border border-accent/30 bg-accent/[0.08]"
                  />
                )}
                <span
                  className={cn(
                    'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-lg border transition-colors',
                    isActive
                      ? 'border-accent/40 bg-gradient-blue text-primary-foreground'
                      : 'border-white/[0.08] bg-white/[0.03] text-muted-foreground group-hover:border-white/[0.16]',
                  )}
                >
                  <slide.icon className="size-3.5" />
                </span>
                <span className="relative z-10 hidden min-w-0 flex-col lg:flex">
                  <span className="truncate text-[13px] font-medium leading-snug">{slide.label}</span>
                  <span className="truncate font-mono text-[11px] text-muted-foreground">
                    {slide.section}
                  </span>
                </span>
                <span className="relative z-10 ml-auto hidden font-mono text-[11px] text-muted-foreground lg:block">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="hidden border-t border-white/[0.06] px-6 py-4 font-mono text-[11px] text-muted-foreground lg:block">
        方向键或滚轮翻页
      </div>
    </nav>
  )
}
