'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, Sparkles, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

type PreviewKind = 'pricing' | 'dashboard' | 'login' | 'landing'

const presets: { match: RegExp; kind: PreviewKind; label: string }[] = [
  { match: /定价|价格|套餐|pricing/i, kind: 'pricing', label: '定价页面' },
  { match: /仪表盘|dashboard|数据|后台/i, kind: 'dashboard', label: '数据仪表盘' },
  { match: /登录|注册|login|sign/i, kind: 'login', label: '登录表单' },
  { match: /落地页|首页|landing|官网/i, kind: 'landing', label: '产品首页' },
]

function detectKind(prompt: string): { kind: PreviewKind; label: string } {
  for (const p of presets) {
    if (p.match.test(prompt)) return { kind: p.kind, label: p.label }
  }
  return { kind: 'landing', label: '产品首页' }
}

export function MiniDemo() {
  const [prompt, setPrompt] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')
  const [result, setResult] = useState<{ kind: PreviewKind; label: string } | null>(null)

  const canGenerate = prompt.trim().length > 1 && status !== 'loading'

  function handleGenerate() {
    if (prompt.trim().length < 2) return
    setStatus('loading')
    setResult(null)
    window.setTimeout(() => {
      setResult(detectKind(prompt))
      setStatus('done')
    }, 900)
  }

  return (
    <div className="grid gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:p-5">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-accent">
          <Sparkles className="size-3.5" />
          试一试
        </div>
        <div className="flex gap-2">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                e.preventDefault()
                handleGenerate()
              }
            }}
            placeholder="例如：帮我做一个深色风格的定价页面"
            className="bg-background/60"
          />
          <Button onClick={handleGenerate} disabled={!canGenerate} size="icon">
            {status === 'loading' ? <Loader2 className="animate-spin" /> : <Wand2 />}
          </Button>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          输入你的界面需求，右侧会实时预览生成的效果结构。
        </p>
      </div>

      <div className="relative flex min-h-40 flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-background/60">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-3.5 py-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-destructive/60" />
            <span className="size-2 rounded-full bg-accent/60" />
            <span className="size-2 rounded-full bg-primary/60" />
          </div>
          {result && (
            <Badge variant="secondary" className="font-mono">
              {result.label}
            </Badge>
          )}
        </div>
        <div className="flex flex-1 items-center justify-center p-5">
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-xs text-muted-foreground"
              >
                预览会显示在这里
              </motion.p>
            )}
            {status === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex w-full flex-col gap-2"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-2.5 rounded-full bg-muted"
                    style={{ width: `${88 - i * 16}%` }}
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.12 }}
                  />
                ))}
              </motion.div>
            )}
            {status === 'done' && result && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <GeneratedPreview kind={result.kind} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function GeneratedPreview({ kind }: { kind: PreviewKind }) {
  if (kind === 'pricing') {
    return (
      <div className="grid w-full grid-cols-3 gap-2">
        {['基础版', '专业版', '企业版'].map((t, i) => (
          <div
            key={t}
            className={`flex flex-col gap-1.5 rounded-lg border p-2.5 ${i === 1 ? 'border-accent bg-accent/10' : 'border-white/[0.08]'}`}
          >
            <span className="text-[11px] font-medium">{t}</span>
            <span className="text-base font-semibold">${(i + 1) * 29}</span>
            <span className="h-1.5 w-full rounded-full bg-muted" />
          </div>
        ))}
      </div>
    )
  }
  if (kind === 'dashboard') {
    return (
      <div className="grid w-full grid-cols-3 gap-2">
        {[62, 84, 41].map((v, i) => (
          <div key={i} className="rounded-lg border border-white/[0.08] p-2.5">
            <span className="text-[10px] text-muted-foreground">指标 {i + 1}</span>
            <div className="mt-2 w-full rounded-md bg-gradient-blue opacity-70" style={{ height: `${v * 0.5}px` }} />
          </div>
        ))}
      </div>
    )
  }
  if (kind === 'login') {
    return (
      <div className="mx-auto flex w-48 flex-col gap-2 rounded-lg border border-white/[0.08] p-3.5">
        <span className="text-xs font-medium">欢迎回来</span>
        <span className="h-7 rounded-md bg-muted" />
        <span className="h-7 rounded-md bg-muted" />
        <span className="h-7 rounded-md bg-gradient-blue" />
      </div>
    )
  }
  return (
    <div className="flex w-full flex-col items-center gap-2 text-center">
      <span className="h-2.5 w-2/3 rounded-full bg-gradient-blue" />
      <span className="h-2 w-1/2 rounded-full bg-muted" />
      <div className="mt-2 grid w-full grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <span key={i} className="h-8 rounded-md bg-muted" />
        ))}
      </div>
    </div>
  )
}
