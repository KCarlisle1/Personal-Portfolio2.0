import * as React from 'react'
import { cn } from '@/lib/utils'

export function Sheet({ open, onOpenChange, children }) {
  return <div data-open={open ? 'true' : 'false'}>{React.Children.map(children, (child) => React.cloneElement(child, { open, onOpenChange }))}</div>
}

export function SheetTrigger({ children, onOpen }) {
  return <span onClick={onOpen}>{children}</span>
}

export function SheetContent({ open, side = 'right', className, onOpenChange, children }) {
  return (
    <div
      className={cn(
        'fixed inset-y-0 right-0 z-50 w-[min(86vw,360px)] border-l border-viola-line bg-[#0f0d20]/98 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300',
        open ? 'translate-x-0' : 'translate-x-full',
        side === 'left' && 'left-0 right-auto border-l-0 border-r',
        className,
      )}
      aria-hidden={!open}
    >
      <button type="button" onClick={() => onOpenChange?.(false)} className="absolute right-4 top-4 rounded-full p-2 text-viola-muted hover:bg-white/5 hover:text-white" aria-label="Close navigation">×</button>
      <div className="mt-8">{children}</div>
    </div>
  )
}
