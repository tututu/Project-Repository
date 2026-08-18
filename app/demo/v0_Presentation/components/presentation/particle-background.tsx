'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  hue: number
  pulse: number
  pulseSpeed: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let particles: Particle[] = []
    let animationId: number
    let time = 0
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(110, Math.round((width * height) / 15000))
      const hues = [210, 225, 245, 195]
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        radius: Math.random() * 1.7 + 0.5,
        hue: hues[Math.floor(Math.random() * hues.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      }))
    }

    function onPointerMove(e: PointerEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    function onPointerLeave() {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    function drawGrid(t: number) {
      const step = 56
      const offset = (t * 0.015) % step
      ctx!.save()
      ctx!.strokeStyle = 'rgba(100, 180, 255, 0.03)'
      ctx!.lineWidth = 1
      for (let x = -step + offset; x < width + step; x += step) {
        ctx!.beginPath()
        ctx!.moveTo(x, 0)
        ctx!.lineTo(x, height)
        ctx!.stroke()
      }
      for (let y = -step + offset * 0.6; y < height + step; y += step) {
        ctx!.beginPath()
        ctx!.moveTo(0, y)
        ctx!.lineTo(width, y)
        ctx!.stroke()
      }
      ctx!.restore()
    }

    function drawOrbits(t: number) {
      const cx = width * 0.72
      const cy = height * 0.28
      for (let i = 0; i < 3; i++) {
        const r = 90 + i * 55
        const rot = t * (0.0004 + i * 0.00015)
        ctx!.beginPath()
        ctx!.strokeStyle = `rgba(125, 211, 252, ${0.045 + i * 0.012})`
        ctx!.lineWidth = 1
        ctx!.setLineDash([4, 10])
        ctx!.ellipse(cx, cy, r, r * 0.42, rot, 0, Math.PI * 2)
        ctx!.stroke()
        ctx!.setLineDash([])

        const ax = cx + Math.cos(rot * 3 + i) * r
        const ay = cy + Math.sin(rot * 3 + i) * r * 0.42
        ctx!.beginPath()
        ctx!.fillStyle = `hsla(${200 + i * 20}, 90%, 70%, 0.5)`
        ctx!.shadowColor = `hsla(${200 + i * 20}, 90%, 65%, 0.55)`
        ctx!.shadowBlur = 8
        ctx!.arc(ax, ay, 2.2, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.shadowBlur = 0
      }
    }

    function draw() {
      time += 1
      ctx!.clearRect(0, 0, width, height)

      const wash = ctx!.createRadialGradient(
        width * 0.5,
        height * 0.35,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.7,
      )
      wash.addColorStop(0, 'rgba(30, 64, 175, 0.1)')
      wash.addColorStop(0.45, 'rgba(14, 116, 144, 0.05)')
      wash.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx!.fillStyle = wash
      ctx!.fillRect(0, 0, width, height)

      if (!reduceMotion) {
        drawGrid(time)
        drawOrbits(time)
      } else {
        drawGrid(0)
      }

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const linkDist = 160

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (!reduceMotion) {
          p.pulse += p.pulseSpeed
          p.x += p.vx
          p.y += p.vy

          const mdx = mx - p.x
          const mdy = my - p.y
          const md = Math.sqrt(mdx * mdx + mdy * mdy)
          if (md < 220 && md > 1) {
            p.vx += (mdx / md) * 0.012
            p.vy += (mdy / md) * 0.012
          }

          p.vx *= 0.995
          p.vy *= 0.995
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
          if (speed > 0.55) {
            p.vx = (p.vx / speed) * 0.55
            p.vy = (p.vy / speed) * 0.55
          }

          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1
          p.x = Math.max(0, Math.min(width, p.x))
          p.y = Math.max(0, Math.min(height, p.y))
        }

        const glow = 0.45 + Math.sin(p.pulse) * 0.35
        const r = p.radius * (0.85 + glow * 0.35)

        ctx!.beginPath()
        ctx!.fillStyle = `hsla(${p.hue}, 95%, 72%, ${0.28 + glow * 0.35})`
        ctx!.shadowColor = `hsla(${p.hue}, 95%, 65%, ${0.4 + glow * 0.25})`
        ctx!.shadowBlur = 6 + glow * 8
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.shadowBlur = 0

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < linkDist) {
            const a = (1 - dist / linkDist) * 0.16
            ctx!.beginPath()
            ctx!.strokeStyle = `hsla(200, 90%, 70%, ${a})`
            ctx!.lineWidth = 1
            ctx!.moveTo(p.x, p.y)
            ctx!.lineTo(q.x, q.y)
            ctx!.stroke()
          }
        }

        const cdx = mx - p.x
        const cdy = my - p.y
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
        if (cdist < 180) {
          ctx!.beginPath()
          ctx!.strokeStyle = `hsla(190, 100%, 75%, ${(1 - cdist / 180) * 0.25})`
          ctx!.lineWidth = 1.2
          ctx!.moveTo(p.x, p.y)
          ctx!.lineTo(mx, my)
          ctx!.stroke()
        }
      }

      if (!reduceMotion) animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="bg-orb absolute -left-32 -top-40 size-[700px] rounded-full bg-[oklch(0.52_0.2_250)] opacity-[0.2] blur-[120px] animate-aurora-a" />
      <div className="bg-orb absolute -right-40 top-[18%] size-[580px] rounded-full bg-[oklch(0.58_0.16_195)] opacity-[0.16] blur-[110px] animate-aurora-b" />
      <div className="bg-orb absolute bottom-[-18%] left-[28%] size-[640px] rounded-full bg-[oklch(0.48_0.18_280)] opacity-[0.12] blur-[130px] animate-aurora-c" />
      <div className="bg-orb absolute left-[42%] top-[8%] size-[320px] rounded-full bg-[oklch(0.7_0.14_210)] opacity-[0.08] blur-[90px] animate-aurora-pulse" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,23,0.5)_100%)]" />

      <canvas ref={canvasRef} className="absolute inset-0 opacity-80" />

      <div className="noise-overlay absolute inset-0 opacity-[0.025] mix-blend-overlay" />
    </div>
  )
}
