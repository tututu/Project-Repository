import type { ComponentType } from 'react'

export interface SlideDefinition {
  id: string
  section: string
  label: string
  title: string
  icon: ComponentType<{ className?: string }>
  component: ComponentType
}
