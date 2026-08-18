import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal, RevealGroup } from './reveal'

interface SlideShellProps {
  eyebrow: string
  children: ReactNode
  className?: string
  contentClassName?: string
}

export function SlideShell({ eyebrow, children, className, contentClassName }: SlideShellProps) {
  return (
    <RevealGroup
      className={cn(
        'relative flex w-full flex-col px-6 py-8 sm:px-12 sm:py-10 lg:px-16 lg:py-12',
        className,
      )}
    >
      <Reveal className="mb-6 flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted-foreground lg:mb-8">
        <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
        {eyebrow}
      </Reveal>
      <div className={cn('flex flex-col', contentClassName)}>{children}</div>
    </RevealGroup>
  )
}
