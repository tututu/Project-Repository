'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { SlideDefinition } from './types'

interface OverviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  slides: SlideDefinition[]
  current: number
  onSelect: (index: number) => void
}

export function OverviewModal({ open, onOpenChange, slides, current, onSelect }: OverviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto border-white/[0.08] bg-[oklch(0.07_0.01_258)]/95 backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg">全部页面</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {slides.map((slide, i) => {
            const isActive = i === current
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => {
                  onSelect(i)
                  onOpenChange(false)
                }}
                className={cn(
                  'group flex flex-col gap-2 rounded-xl border p-3 text-left transition-colors',
                  isActive
                    ? 'border-accent/40 bg-accent/[0.08]'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16]',
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      'flex size-7 items-center justify-center rounded-md',
                      isActive ? 'bg-gradient-blue text-primary-foreground' : 'bg-white/[0.06] text-muted-foreground',
                    )}
                  >
                    <slide.icon className="size-3.5" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-foreground">{slide.label}</span>
                  <span className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">
                    {slide.title}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
