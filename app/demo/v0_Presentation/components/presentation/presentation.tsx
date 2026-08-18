'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Cpu,
  Flag,
  Grid3x3,
  History,
  Rocket,
  Scale,
  Sparkles,
  Users,
} from 'lucide-react'
import { ParticleBackground } from './particle-background'
import { Sidebar } from './sidebar'
import { NavDots } from './nav-dots'
import { Toolbar } from './toolbar'
import { OverviewModal } from './overview-modal'
import { CoverSlide } from './slides/cover-slide'
import { HistorySlide } from './slides/history-slide'
import { TechArchitectureSlide } from './slides/tech-architecture-slide'
import { FeaturesGridSlide } from './slides/features-grid-slide'
import { UseCasesSlide } from './slides/use-cases-slide'
import { AudienceSlide } from './slides/audience-slide'
import { DesignSystemSlide } from './slides/design-system-slide'
import { ProsConsSlide } from './slides/pros-cons-slide'
import { SummarySlide } from './slides/summary-slide'
import type { SlideDefinition } from './types'

const slides: SlideDefinition[] = [
  {
    id: 'cover',
    section: '',
    label: 'V0 介绍',
    title: '认识 V0——用自然语言构建界面',
    icon: Sparkles,
    component: CoverSlide,
  },
  {
    id: 'history',
    section: '01 · 起源',
    label: '历史与由来',
    title: 'v0 从单组件生成到全栈应用平台的演进历程',
    icon: History,
    component: HistorySlide,
  },
  {
    id: 'architecture',
    section: '02 · 架构',
    label: '技术架构',
    title: '四大技术层协同，把描述转化为可运行界面',
    icon: Cpu,
    component: TechArchitectureSlide,
  },
  {
    id: 'features',
    section: '03 · 功能',
    label: '12 大核心功能',
    title: '一张网格看懂 v0 的全部核心能力',
    icon: Grid3x3,
    component: FeaturesGridSlide,
  },
  {
    id: 'use-cases',
    section: '04 · 场景',
    label: '能做什么',
    title: '六个真实场景，覆盖从页面到系统的常见需求',
    icon: Rocket,
    component: UseCasesSlide,
  },
  {
    id: 'audience',
    section: '05 · 人群',
    label: '应用人群',
    title: '前端、产品、创业团队、教学场景都能受益',
    icon: Users,
    component: AudienceSlide,
  },
  {
    id: 'design-system',
    section: '06 · 设计系统',
    label: '设计系统',
    title: '默认 shadcn，也能接入团队自己的规范',
    icon: Sparkles,
    component: DesignSystemSlide,
  },
  {
    id: 'pros-cons',
    section: '07 · 权衡',
    label: '优势与局限',
    title: '客观看待 v0 的能力边界',
    icon: Scale,
    component: ProsConsSlide,
  },
  {
    id: 'summary',
    section: '结语',
    label: '总结',
    title: '是什么、能干什么、解决什么、对团队有什么用',
    icon: Flag,
    component: SummarySlide,
  },
]

const total = slides.length

export function Presentation() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [overviewOpen, setOverviewOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [zoom, setZoom] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const wheelLockRef = useRef(false)

  const ZOOM_MIN = 0.8
  const ZOOM_MAX = 1.8
  const ZOOM_STEP = 0.1

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(ZOOM_MAX, Math.round((z + ZOOM_STEP) * 100) / 100))
  }, [])

  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(ZOOM_MIN, Math.round((z - ZOOM_STEP) * 100) / 100))
  }, [])

  const zoomReset = useCallback(() => {
    setZoom(1)
  }, [])

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next))
      setDirection(clamped >= index ? 1 : -1)
      setIndex(clamped)
    },
    [index],
  )

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null
      const isTyping = target && ['TEXTAREA', 'INPUT'].includes(target.tagName)
      if (isTyping) return

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        goTo(index + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        goTo(index - 1)
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen()
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault()
        zoomIn()
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault()
        zoomOut()
      } else if (e.key === '0') {
        e.preventDefault()
        zoomReset()
      } else if (e.key === 'Escape' && overviewOpen) {
        setOverviewOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index, goTo, overviewOpen, zoomIn, zoomOut, zoomReset])

  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollLeft = 0
      el.scrollTop = 0
    }
  }, [zoom, index])

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      const target = e.target as HTMLElement | null
      if (target?.closest('[data-wheel-scrollable]')) return

      // Zoomed content may grow taller after reflow — prefer vertical scroll first.
      const scroller = scrollRef.current
      if (scroller && scroller.scrollHeight > scroller.clientHeight + 4) {
        const atTop = scroller.scrollTop <= 0
        const atBottom =
          scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 4
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
          return
        }
      }

      const threshold = 12
      if (Math.abs(e.deltaY) < threshold) return
      if (wheelLockRef.current) return

      e.preventDefault()
      wheelLockRef.current = true
      goTo(index + (e.deltaY > 0 ? 1 : -1))
      window.setTimeout(() => {
        wheelLockRef.current = false
      }, 550)
    }

    const el = containerRef.current
    el?.addEventListener('wheel', onWheel, { passive: false })
    return () => el?.removeEventListener('wheel', onWheel)
  }, [index, goTo])

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }

  const ActiveSlide = slides[index].component

  return (
    <div ref={containerRef} className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar
        slides={slides}
        current={index}
        onSelect={goTo}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed((v) => !v)}
      />

      <main className="relative h-full flex-1 overflow-hidden">
        <ParticleBackground />

        {/*
          响应式缩放：布局宽度 = 100%/zoom，再用 CSS zoom 放大。
          minHeight 撑满视口；子项 my-auto 在内容较矮时垂直居中，过高时从顶部滚动。
        */}
        <div
          ref={scrollRef}
          className="scrollbar-none absolute inset-0 z-10 overflow-x-hidden overflow-y-auto"
        >
          <div
            className="flex w-full flex-col transition-[width] duration-200 ease-out"
            style={{
              zoom,
              width: `${100 / zoom}%`,
              minHeight: `${100 / zoom}%`,
            }}
          >
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={slides[index].id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -48 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="my-auto w-full"
              >
                <ActiveSlide />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Toolbar
          isFullscreen={isFullscreen}
          zoom={zoom}
          onToggleFullscreen={toggleFullscreen}
          onOpenOverview={() => setOverviewOpen(true)}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onZoomReset={zoomReset}
        />

        <NavDots slides={slides} current={index} onSelect={goTo} />

        <div className="absolute inset-x-0 bottom-0 z-30 h-0.5 bg-border">
          <motion.div
            className="h-full bg-gradient-blue"
            animate={{ width: `${((index + 1) / total) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </main>


      <OverviewModal
        open={overviewOpen}
        onOpenChange={setOverviewOpen}
        slides={slides}
        current={index}
        onSelect={goTo}
      />
    </div>
  )
}
