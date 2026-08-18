'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { SlideDefinition } from './types'

interface NavDotsProps {
  slides: SlideDefinition[]
  current: number
  onSelect: (index: number) => void
}

export function NavDots({ slides, current, onSelect }: NavDotsProps) {
  return (
    <nav
      aria-label="幻灯片导航"
      className="fixed right-4 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3 sm:right-6"
    >
      {slides.map((slide, i) => (
        <Tooltip key={slide.id}>
          <TooltipTrigger
            aria-label={`跳转到 ${slide.label}`}
            aria-current={i === current}
            onClick={() => onSelect(i)}
            className="group relative flex size-4 items-center justify-center rounded-full outline-none"
          >
            <span
              className={cn(
                'block size-1.5 rounded-full border border-foreground/30 transition-all duration-300 group-hover:border-accent',
                i === current ? 'scale-150 border-accent bg-accent' : 'bg-foreground/20',
              )}
            />
          </TooltipTrigger>
          <TooltipContent side="left">{slide.label}</TooltipContent>
        </Tooltip>
      ))}
    </nav>
  )
}
