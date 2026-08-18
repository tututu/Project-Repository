'use client'

import { ExternalLink, LayoutGrid, Maximize, Minimize, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface ToolbarProps {
  isFullscreen: boolean
  zoom: number
  onToggleFullscreen: () => void
  onOpenOverview: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onZoomReset: () => void
}

export function Toolbar({
  isFullscreen,
  zoom,
  onToggleFullscreen,
  onOpenOverview,
  onZoomIn,
  onZoomOut,
  onZoomReset,
}: ToolbarProps) {
  return (
    <div className="fixed right-3 top-3 z-40 flex items-center gap-1.5 sm:right-5 sm:top-5">
      <div className="flex items-center gap-0.5 rounded-lg border border-border bg-card/70 p-0.5 backdrop-blur-md">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="缩小" onClick={onZoomOut} />
            }
          >
            <ZoomOut />
          </TooltipTrigger>
          <TooltipContent>缩小（-）</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <button
                type="button"
                onClick={onZoomReset}
                aria-label="重置缩放"
                className="min-w-[3rem] rounded-md px-1.5 py-1 text-center font-mono text-xs text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
              />
            }
          >
            {Math.round(zoom * 100)}%
          </TooltipTrigger>
          <TooltipContent>重置为 100%（0）</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="放大" onClick={onZoomIn} />
            }
          >
            <ZoomIn />
          </TooltipTrigger>
          <TooltipContent>放大（+），字号变大且自动重排，不裁切</TooltipContent>
        </Tooltip>
      </div>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="outline" size="icon-sm" aria-label="全部页面" onClick={onOpenOverview} />
          }
        >
          <LayoutGrid />
        </TooltipTrigger>
        <TooltipContent>全部页面</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="切换全屏"
              onClick={onToggleFullscreen}
            />
          }
        >
          {isFullscreen ? <Minimize /> : <Maximize />}
        </TooltipTrigger>
        <TooltipContent>全屏（F）</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <a
              href="https://v0.app"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 flex items-center gap-1.5 rounded-lg border border-border bg-card/70 px-2.5 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur-md transition-colors hover:border-accent/50 hover:text-foreground"
            />
          }
        >
          v0.app
          <ExternalLink className="size-3" />
        </TooltipTrigger>
        <TooltipContent>在新标签页打开 v0 官网</TooltipContent>
      </Tooltip>
    </div>
  )
}
