import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { ArrowDownRight, ArrowRight, ExternalLink, Github, Linkedin, Mail, Menu, Moon, Shirt, Sparkles, Sun, Music, Music2, Music3, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import '@/index.css'

const PROJECTS = [
  {
    title: 'CuedMood',
    description: 'How are you feeling today? Keep track of your emotions with this friendly mobile tracker app. It will remember your journey and provide helpful guidance.',
    tags: ['React Native', 'Expo', 'Zustand'],
    tone: 'from-[var(--deep)] via-[var(--pink)] to-[var(--cream)]',
    type: 'mobile',
    href: '#contact',
  },
  {
    title: 'ShoutFit',
    description: 'Are you stylish? Or have you fallen behind the times? Come find out in this snazzy fullstack wardrobe/forum app.',
    tags: ['React', 'Express.js', 'Hand-drawn'],
    tone: 'from-[var(--panel)] via-[var(--line)] to-[var(--pink)]',
    type: 'outfit',
    href: '#contact',
  },
  {
    title: 'Finance Manager',
    description: 'Visualise your financial changes with a ton of handy graphs in this mathematical tracker.',
    tags: ['UI', 'React', 'JavaScript'],
    tone: 'from-[var(--deep)] via-[var(--gold)] to-[var(--pink)]',
    type: 'finance',
    href: '/projects/finance-manager/homepage.html',
    demoAvailable: true,
  },
  {
    title: 'ButteflI-D',
    description:"Test your general knowledge! Will you be bested by Britain's beautiful butterflies?",
    tags: ['JavaScript', 'CSS', 'React'],
    tone: 'from-[var(--cream)] via-[var(--deep)] to-[var(--lilac)]',
    type: 'butterfly',
    href: '/projects/butterfli-d/homepage.html',
    demoAvailable: true,
  },
  {
    title: 'Smart Lamp',
    description: 'Follow me as I explore a journey of colour and creation - my very first hardware exploration!',
    tags: ['Arduino', 'C++', 'Electronics'],
    tone: 'from-[var(--line)] via-[var(--deep)] to-[var(--gold)]',
    type: 'lamp',
    href: '#contact',
  },
  {
    title: 'NaN Calculator',
    description: 'Educational and informative. Figure out the reasons behind a calculators most frustrating response.',
    tags: ['React Native', 'Expo', 'JavaScript'],
    tone: 'from-[var(--line)] via-[var(--deep)] to-[var(--pink)]',
    type: 'nan',
    href: '#contact',
  },
  {
    title: 'Data Driven App',
    description: 'As nontraditional as application dev gets - none of the usual stack!',
    tags: ['C++', 'OpenFrameworks', 'API'],
    tone: 'from-[var(--ink)] via-[var(--deep)] to-[var(--gold)]',
    type: 'cashregister',
    href: '#contact',
  },
  {
    title: 'Live Coding',
    description: 'Follow me as I experiment with performance, programming and the art of music.',
    tags: ['JavaScript', 'Creative Coding', 'Music'],
    tone: 'from-[var(--ink)] via-[var(--pink)] to-[var(--deep)]',
    type: 'livecoding',
    href: '#contact',
  },
  {
    title: 'This Portfolio',
    description: 'A representation of my ventures, big and small.',
    tags: ['React', 'Tailwind', 'shadcn/ui'],
    tone: 'from-[var(--ink)] via-[var(--deep)] to-[var(--gold)]',
    type: 'portfolio',
    href: '#contact',
  },
  {
    title: 'More to be added',
    description: "Forever building. Check back soon ;)",
    tags: ['Coming Soon', 'Ideas', 'Projects'],
    tone: 'from-[var(--panel)] via-[var(--line)] to-[var(--deep)]',
    type: 'more',
    href: '#contact',
  },
]

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function DecorativeShapes({ lightPreview }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      
      <div
        className={`absolute right-[22%] top-[40%] h-48 w-48 rounded-full blur-3xl ${
          lightPreview
            ? 'bg-[#ffc872]/20'
            : 'bg-[#c957bc]/20'
        }`}
      />

      <div
        className={`absolute left-[12%] top-[55%] h-36 w-36 rounded-full blur-3xl ${
          lightPreview
            ? 'bg-[#ffe3b3]/30'
            : 'bg-[#ffc872]/10'
        }`}
      />

      <div className="grid-glow absolute inset-0 opacity-70" />
    </div>
  )
}

function TechBubble({ label, icon, size = 100, className = '', style = {} }) {
  return (
    <div
      className={`hero-orb absolute flex items-center justify-center rounded-full border border-white/40 shadow-2xl backdrop-blur-sm ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: '5s',
        ...style,
      }}
    >
      <div className="text-center">
        <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#090817]/15 text-[var(--ink)]">
          {icon}
        </div>
        <div className="px-2 text-xs font-extrabold tracking-tight text-[var(--ink)] sm:text-sm">
          {label}
        </div>
      </div>
    </div>
  )
}

function TaDaMark({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute h-1 w-8 rounded-full bg-[var(--gold)] ${className}`}
    />
  )
}

function ProjectVisual({ type, tone }) {
  if (type === 'mobile') {
    return (
      <div className={`project-image flex h-full w-full items-center justify-center bg-gradient-to-br ${tone}`}>
        <div className="relative h-40 w-28 rounded-[26px] border border-white/60 bg-[#090817]/40 p-4 shadow-2xl backdrop-blur-sm">
          <div className="h-4 rounded-full bg-white/10" />
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              'var(--lilac)',
              'var(--pink)',
              'var(--gold)',
              'var(--cream)',
              'var(--lilac)',
              'var(--cream)',
            ].map((c, i) => (
              <span
                key={i}
                className="aspect-square rounded-xl"
                style={{ background: c }}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-center gap-1.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-3 w-7 rounded-full bg-white/15"
              />
            ))}
          </div>
          <div className="mt-3 h-2 w-full rounded bg-white/10 bottom-0" />
        </div>
      </div>
    )
  }

  if (type === 'outfit') {
    return (
      <div className={`project-image flex h-full w-full items-center justify-center bg-gradient-to-br ${tone}`}>
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-black/10 backdrop-blur-sm">
          <Shirt
            size={65}
            strokeWidth={2}
            className="text-[var(--cream)]"
          />
        </div>
        <div className="absolute bottom-2  flex gap-1.5 rounded-full border border-white/15 bg-black/20 px-2 py-1.5 backdrop-blur-sm">
        {[
          'var(--pink)',
          'var(--gold)',
          'var(--cream)',
          'var(--lilac)',
        ].map((c, i) => (
          <span
            key={i}
            className="h-4 w-4 rounded-full border border-white/30"
            style={{ background: c }}
          />
        ))}
      </div>
      <div className="absolute right-5 top-3 w-24 rounded-xl border border-white/20 bg-[#090817]/35 p-2.5 shadow-xl backdrop-blur-sm">
        <div className="mb-2 h-1.5 w-10 rounded-full bg-white/30" />
        <div className="space-y-1.5">
          <div className="h-2 rounded-full bg-white/15" />
          <div className="h-2 w-4/5 rounded-full bg-white/10" />
        </div>
        <div className="mt-2 flex gap-1">
          <span className="h-3 w-3 rounded bg-[var(--pink)]" />
          <span className="h-3 w-3 rounded bg-[var(--gold)]" />
          <span className="h-3 w-3 rounded bg-[var(--cream)]" />
        </div>
      </div>
      <div className="absolute right-10 bottom-16 text-lg text-[var(--cream)]">✦</div>
      <div className="absolute  left-10 top-16 text-lg text-[var(--cream)]">✦</div>
      </div>
    )
  }

  if (type === 'finance') {
    return (
      <div className={`project-image h-full w-full bg-gradient-to-br ${tone} p-5`}>
        <div className="mx-16 h-full rounded-xl border border-white/20 bg-[#090817]/30 p-4 shadow-2xl backdrop-blur">
          <div className="mb-4 grid grid-cols-3 gap-2">
            <div className="h-9 rounded-lg border border-white/10 bg-white/10" />
            <div className="h-9 rounded-lg border border-[#ffc872]/20 bg-[#ffc872]/20" />
            <div className="h-9 rounded-lg border border-[#e9a5e2]/20 bg-[#e9a5e2]/20" />
          </div>
          <div className="mb-3 space-y-1.5">
            <div className="h-2 w-2/5 rounded-full bg-[#ffe3b3]/70" />
            <div className="h-1.5 w-3/5 rounded-full bg-white/15" />
          </div>
          
          <div className="flex h-14 items-end gap-1.5 px-1">
            <div className="h-4 flex-1 rounded-t-md bg-[#c957bc]/60" />
            <div className="h-7 flex-1 rounded-t-md bg-[#ffc872]/70" />
            <div className="h-5 flex-1 rounded-t-md bg-[#e9a5e2]/60" />
            <div className="h-9 flex-1 rounded-t-md bg-[#c957bc]/80" />
            <div className="h-6 flex-1 rounded-t-md bg-[#ffc872]/80" />
            <div className="h-11 flex-1 rounded-t-md bg-[#ffe3b3]/70" />
            <div className="h-8 flex-1 rounded-t-md bg-[#e9a5e2]/70" />
          </div>
          <div className="mt-1 h-px w-full bg-white/20" />
        </div>
      </div>
    )
  }

  if (type === 'butterfly') {
    return (
      <div className={`project-image relative h-full w-full bg-gradient-to-br ${tone} p-5`}>
        <div className="relative mx-16 h-full rounded-xl border border-white/20 bg-[#090817]/30 p-4 shadow-2xl backdrop-blur">
          <div className="absolute top-2 left-1/2 h-5 w-3/5 -translate-x-1/2 rounded-lg border border-white/15 bg-white/10" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

            <div className="relative h-24 w-28">
              <div className="absolute left-0 top-2 h-12 w-12 rotate-[-25deg] rounded-[70%_40%_65%_45%] bg-[#c957bc]/75 shadow-[0_0_25px_rgba(201,87,188,.35)]" />
              <div className="absolute left-2 bottom-0 h-10 w-10 rotate-[10deg] rounded-[60%_45%_65%_40%] bg-[#e9a5e2]/70" />

              <div className="absolute right-0 top-2 h-12 w-12 rotate-[25deg] rounded-[40%_70%_45%_65%] bg-[#ffc872]/75 shadow-[0_0_25px_rgba(255,200,114,.3)]" />
              <div className="absolute right-2 bottom-0 h-10 w-10 rotate-[-10deg] rounded-[45%_60%_40%_65%] bg-[#ffe3b3]/70" />

              <div className="absolute left-1/2 top-2 h-20 w-2.5 -translate-x-1/2 rounded-full bg-[#090817]/70" />
              <div className="absolute left-[40%] top-0 h-7 w-px -rotate-[25deg] bg-white/50" />

              <div className="absolute left-[60%] top-0 h-7 w-px rotate-[25deg] bg-white/50" />
            </div>
          </div>
          <div className="absolute bottom-2 left-1/2 h-4 w-2/5 -translate-x-1/2 rounded-lg border border-white/15 bg-white/10" />
          <div className="absolute bottom-2 right-4 w-20 rounded-lg border border-white/15 bg-[#090817]/50 p-2 shadow-xl backdrop-blur-sm">
            <div className="mb-2 h-1.5 w-7 rounded-full bg-[#ffe3b3]/60" />
            <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    )
  }

  if (type === 'lamp') {
    return (
      <div className={`project-image relative h-full w-full bg-gradient-to-br ${tone} p-6`}>
        <div className="absolute left-1/2 bottom-4 h-48 w-48 -translate-x-1/2 rounded-full bg-[var(--lilac)] shadow-[0_0_30px_10px_rgba(201,87,188,.8),0_0_75px_30px_rgba(201,87,188,.55)]" />
        <div className="absolute bottom-10 left-10 right-10 h-12 rounded-2xl border border-white/30 bg-black/20 shadow-2xl backdrop-blur-sm z-10" />
        <div className="absolute bottom-[50px] left-[13%] right-[13%] z-20 flex justify-between">
          {[...Array(9)].map((_, i) => (
            <span
              key={i}
              className="h-7 w-7 rounded-full bg-[var(--cream)] shadow-[0_0_20px_rgba(255,227,179,.65)]"
            />
          ))}
        </div>
      </div>
    )
  }

 if (type === 'nan') {
    return (
      <div className={`project-image h-full w-full bg-gradient-to-br ${tone} p-5`}>
        <div className="mx-4 sm:mx-16 flex h-full max-w-[78%] gap-3 rounded-xl border border-white/15 bg-[#090817]/30 p-3 backdrop-blur">
          <div className="grid w-1/2 grid-cols-4 gap-1.5 self-center">
            {[
              '1', '2', '3', '+',
              '4', '5', '6', '-',
              '7', '8', '9', '%',
            ].map((item, i) => (
              <span
                key={i}
                className={`flex aspect-square items-center justify-center rounded-md text-[10px] ${
                  ['+', '-', '%'].includes(item)
                    ? 'bg-[#c957bc]/20 text-[var(--cream)]'
                    : 'bg-white/10 text-white/80'
                }`}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-1 items-center">
            <div className="rounded-xl border border-[#ffe3b3]/20 bg-[#ffe3b3]/10 p-3 text-[9px] leading-relaxed text-[var(--cream)]">
              What does this mean?
              <br />
              <span className="text-white/60">That operation produced NaN. Here's why.</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'cashregister') {
    return (
      <div className={`project-image relative h-full w-full bg-gradient-to-br ${tone} p-5`}>
        <div className="absolute right-24 bottom-5 z-10 h-16 w-16 -translate-x-1/2 rotate-[-2deg] rounded-sm border border-white/20 bg-[#ffe3b3]/80 p-2 shadow-xl">
          <div className="space-y-1">
            <div className="h-1 w-4/5 rounded-full bg-[#090817]/25" />
            <div className="h-1 w-full rounded-full bg-[#090817]/20" />
            <div className="h-1 w-3/5 rounded-full bg-[#090817]/20" />
            <div className="mt-2 h-1 w-2/3 rounded-full bg-[#090817]/30" />
          </div>
        </div>

        <div className="absolute left-1/2 top-9 h-40 w-64 -translate-x-1/2">
          <div className="absolute left-1/2 top-0 z-20 h-16 w-52 -translate-x-1/2 rounded-lg border border-white/25 bg-gradient-to-br from-[#e9a5e2]/65 via-[#c957bc]/60 to-[#752092]/65 shadow-xl backdrop-blur-sm">
            <div className="absolute left-3 top-3 flex h-7 w-14 items-center justify-center rounded-md border border-white/15 bg-[#090817]/50 text-[8px] font-bold text-[#ffe3b3]">
              £41.80
            </div>
            <div className="absolute right-2 bottom-2 flex h-3 w-7 rounded-md border border-white/15 bg-[#090817]/50" />
          </div>

          <div
            className="absolute left-1/2 top-14 z-10 h-16 w-60 -translate-x-1/2 border border-white/20 bg-gradient-to-b from-[#752092]/55 via-[#752092]/70 to-[#4d1464]/80"
            style={{
              clipPath: 'polygon(8% 0, 92% 0, 100% 100%, 0 100%)',
            }}
          />

          <div className="absolute bottom-0 left-1/2 h-10 w-60 -translate-x-1/2 rounded-b-lg border border-white/20 bg-gradient-to-b from-[#24112d]/75 to-[#090817]/85 shadow-2xl backdrop-blur-sm">
            <div className="absolute left-1/2 top-4 h-2 w-28 -translate-x-1/2 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    )
  }

  if (type === 'livecoding') {
    return (
      <div className={`project-image relative h-full w-full bg-gradient-to-br ${tone} p-5`}>
        <div className="absolute left-10 top-8 w-32 space-y-2 rotate-[-4deg]">
          <div className="h-2 w-20 rounded-full bg-[#ffe3b3]/70" />
          <div className="h-2 w-28 rounded-full bg-white/25" />
          <div className="h-2 w-16 rounded-full bg-[#c957bc]/70" />
          <div className="h-2 w-24 rounded-full bg-white/15" />
        </div>
        <div className="absolute right-10 top-12 w-28 space-y-2 rotate-[5deg]">
          <div className="h-2 w-24 rounded-full bg-white/20" />
          <div className="h-2 w-16 rounded-full bg-[#ffc872]/60" />
          <div className="h-2 w-20 rounded-full bg-white/15" />
        </div>
        <div className="absolute bottom-6 left-16 w-36 space-y-2 rotate-[13deg]">
          <div className="h-2 w-28 rounded-full bg-[#e9a5e2]/65" />
          <div className="h-2 w-36 rounded-full bg-white/20" />
          <div className="h-2 w-20 rounded-full bg-[#ffc872]/55" />
        </div>

        <Music
          className="absolute left-[34%] top-[10%] text-[#ffc872]/80"
          size={22}
          strokeWidth={1.8}
        />
        <Music2
          className="absolute right-[30%] top-[34%] rotate-[-12deg] text-[#e9a5e2]/80"
          size={28}
          strokeWidth={1.8}
        />
        <Music3
          className="absolute left-[22%] bottom-[40%] rotate-[10deg] text-[#ffe3b3]/70"
          size={20}
          strokeWidth={1.8}
        />
        <Music
          className="absolute right-[14%] bottom-[20%] rotate-[-8deg] text-[#c957bc]/80"
          size={24}
          strokeWidth={1.8}
        />
        <Music2
          className="absolute left-[52%] bottom-[12%] text-white/40"
          size={16}
          strokeWidth={1.8}
        />

        <div className="absolute left-1/2 top-1/2 flex w-32 -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-xl border border-white/15 bg-[#090817]/35 p-4 shadow-xl backdrop-blur-sm">
          <div className="h-2 w-14 rounded-full bg-[#c957bc]/60" />
          <div className="h-2 w-24 rounded-full bg-white/20" />
          <div className="h-2 w-20 rounded-full bg-[#ffc872]/55" />
          <div className="h-2 w-28 rounded-full bg-white/15" />
        </div>
      </div>
    )
  }

  if (type === 'portfolio') {
    return (
      <div className={`project-image h-full w-full bg-gradient-to-br ${tone} p-5`}>
        <div className="mx-16 h-full max-w-[88%] rounded-xl border border-white/20 bg-[#090817]/30 p-4 shadow-2xl backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <span className="h-2 w-2 rounded-full bg-[var(--pink)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
          </div>
          <div className="space-y-2">
            <div className="h-2 w-3/5 rounded-full bg-[#ffe3b3]/70" />
            <div className="h-2 w-4/5 rounded-full bg-white/20" />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-14 rounded-lg bg-gradient-to-r from-[#752092]/45 to-[#ffc872]/20" />
              <div className="h-14 rounded-lg bg-gradient-to-r from-[#752092]/45 to-[#ffc872]/20" />
              <div className="h-14 rounded-lg bg-gradient-to-r from-[#752092]/45 to-[#ffc872]/20" />
            </div>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className={`project-image flex h-full w-full items-center justify-center bg-gradient-to-br ${tone}`}>
      <div className="flex items-center justify-center gap-3">
        <div className="h-20 w-20 rounded-full bg-[var(--pink)] shadow-[0_0_55px_rgba(201,87,188,.45)]" />
        <div className="h-20 w-20 rounded-full bg-[var(--gold)] shadow-[0_0_55px_rgba(255,200,114,.4)]" />
        <div className="h-20 w-20 rounded-full bg-[var(--lilac)] shadow-[0_0_55px_rgba(170,161,255,.4)]" />
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightPreview, setLightPreview] = useState(false)
  const [copiedContact, setCopiedContact] = useState(null)

  const email = 'katie.carlisle15@gmail.com'
  const phone = '+44 7999 732402'

  const copyContact = async (type, value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedContact(type)

      setTimeout(() => {
        setCopiedContact(null)
      }, 2000)
    } catch (error) {
      console.error('Failed to copy contact details:', error)
    }
  }

  const nav = [
    ['Projects', 'projects'],
    ['About', 'about'],
    ['Contact', 'contact'],
  ]

  return (
    <div
      className={
        lightPreview
          ? 'light-preview min-h-screen bg-white text-[var(--deep)]'
          : 'min-h-screen bg-viola-ink text-viola-text'
      }
    >
      <header className={`sticky top-0 z-40 border-b backdrop-blur-xl ${lightPreview ? 'border-black/10 bg-white/75' : 'border-white/10 bg-[#090817]/75'}`}>
        <div className="flex h-16  items-center justify-between px-5 sm:px-8">
          <button onClick={() => scrollToId('top')} className="group flex items-center gap-3" aria-label="Back to top">
            <span className="h-5 w-5 rounded-full bg-gradient-to-br from-[var(--pink)] to-[var(--deep)] shadow-[0_0_24px_rgba(201,87,188,.5)]" />
            <span className="text-sm font-bold sm:text-base">Katie Carlisle</span>
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map(([label, id]) => (
              <button key={id} onClick={() => scrollToId(id)} className={`group relative text-sm font-medium transition ${
                lightPreview
                  ? 'text-[var(--deep)] hover:text-[var(--ink)]'
                  : 'text-viola-muted hover:text-white'
              }`}>
                {label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-[var(--pink)] transition-all group-hover:w-full hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setLightPreview((value) => !value)} aria-label="Toggle theme preview">
              {lightPreview ? <Sun size={20} color='var(--deep)' /> : <Moon size={20} color='var(--gold)' />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${
                lightPreview
                  ? 'text-[var(--plum)] hover:bg-[var(--cream)]/40 hover:text-[var(--deep)]'
                  : ''
              }`}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </header>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          open={menuOpen}
          onOpenChange={setMenuOpen}
          className={
            lightPreview
              ? '[&>button]:text-[var(--plum)] [&>button]:hover:bg-[var(--cream)]/40 [&>button]:hover:text-[var(--deep)]'
              : ''
          }
        >
          <div className="flex flex-col gap-3">
            {nav.map(([label, id]) => (
              <button key={id} onClick={() => { setMenuOpen(false); setTimeout(() => scrollToId(id), 80) }} className={`rounded-xl px-4 py-3 text-left font-semibold ${
                lightPreview
                  ? 'text-[var(--deep)] hover:bg-[var(--cream)]/40'
                  : 'text-white hover:bg-white/5'
              }`}>{label}</button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <main id="top">
        <section className="relative overflow-hidden">
          <DecorativeShapes lightPreview={lightPreview} />
          <div className="mx-4 sm:mx-16 grid min-h-[620px]  items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
            <div className="relative z-10 max-w-2xl">
              <Badge className={`mb-5 px-4 py-2 text-xl ${
                lightPreview
                  ? 'border-[var(--gold)]/50 bg-[var(--cream)] text-[var(--deep)] shadow-[0_0_20px_rgba(255,200,114,.18)]'
                  : 'text-[var(--cream)] bg-[#752092]/30'
              }`}>Hi, I'm Katie Carlisle</Badge>
              <h1 className="text-5xl font-bold leading-[.97] tracking-[-.04em] sm:text-6xl lg:text-7xl">
                I develop<br />
                <span className="relative inline-block">
                  <span className="text-gradient">creative software.</span>
                  <TaDaMark className="right-11 top-[18%] w-5 rotate-[-42deg] hidden min-[1400px]:block min-[1400px]:-right-7" />
                  <TaDaMark className="right-9 top-[48%] w-8 rotate-[-5deg] hidden min-[1400px]:block min-[1400px]:-right-9" />
                </span>
              </h1>
              <p
                className={`mt-6 max-w-xl text-base leading-7 sm:text-lg ${
                  lightPreview
                    ? 'text-[var(--deep)]'
                    : 'text-viola-muted'
                }`}
              >
                An aspiring software developer, prioritising inspired visuals with technical know-how. I'm constantly seeking challenges, and new ways to build.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => scrollToId('projects')}>View my projects <ArrowRight size={17} className="ml-2" /></Button>
                <Button size="lg" variant="outline" className={
                  lightPreview
                    ? 'border-[#ffc872)]/80 bg-[#ffe3b3]/15 text-[var(--deep)] hover:bg-[var(--cream)] hover:text-[var(--deep)]'
                    : ''
                } onClick={() => scrollToId('contact')}>Get in touch <Mail size={17} className="ml-2" /></Button>
              </div>
            </div>

            <div className="relative mx-auto h-[350px] w-full max-w-[550px] sm:h-[420px] lg:h-[500px]">
              <div className="hero-bubbles">
                <TaDaMark className="left-[11%] top-[15%] w-7 rotate-[48deg]" />
                <TaDaMark className="left-[8%] top-[22%] w-5 rotate-[5deg]" />

                <TaDaMark className="left-[10%] bottom-[3%] w-8 rotate-[-50deg]" />
                <TaDaMark className="left-[15%] bottom-[1%] w-7 rotate-[100deg]" />

                <TaDaMark className="right-[0%] top-[45%] w-5 rotate-[-20deg]" />
                <TaDaMark className="right-[0%] top-[53%] w-8 rotate-[30deg]" />
                <TechBubble
                  label="C++"
                  size={80}
                  className="right-[40%] top-[5%] bg-[var(--cream)] animate-float"
                  icon={<span className="text-lg">⚛</span>}
                />

                <TechBubble
                  label="React"
                  size={150}
                  className="left-[16%] top-[17%] bg-[var(--plum)] animate-float"
                  style={{ animationDelay: '.6s' }}
                  icon={<span className="text-lg">▣</span>}
                />

                <TechBubble
                  label="TypeScript"
                  size={108}
                  className="right-[10%] top-[21%] bg-[var(--pink)] animate-float"
                  style={{ animationDelay: '1s' }}
                  icon={<span className="text-[11px] font-black">JS</span>}
                />

                <TechBubble
                  label="Svelte"
                  size={100}
                  className="left-[2%] top-[46%] bg-[var(--gold)] animate-float"
                  style={{ animationDelay: '1.3s' }}
                  icon={<span className="text-[11px] font-black">TS</span>}
                />

                <TechBubble
                  label="C#"
                  size={74}
                  className="left-[29%] top-[50%] bg-[var(--lilac)] animate-float"
                  style={{ animationDelay: '.8s' }}
                  icon={<span className="text-xs font-black">C#</span>}
                />

                <TechBubble
                  label="Vue"
                  size={92}
                  className="right-[35%] top-[32%] bg-[var(--cream)] animate-float"
                  style={{ animationDelay: '1.7s' }}
                  icon={<span className="text-xs font-black">C++</span>}
                />

                <TechBubble
                  label="Node.js"
                  size={130}
                  className="left-[23%] bottom-[3%] bg-[var(--gold)] animate-float"
                  style={{ animationDelay: '1.4s' }}
                  icon={<span className="text-base">✦</span>}
                />

                <TechBubble
                  label="JavaScript"
                  size={160}
                  className="left-[64%] bottom-[20%] bg-[var(--pink)] animate-float"
                  style={{ animationDelay: '2s' }}
                  icon={<span className="text-xs font-black">V</span>}
                />

                <TechBubble
                  label="Unity"
                  size={78}
                  className="right-[32%] bottom-[4%] bg-[var(--plum)] animate-float"
                  style={{ animationDelay: '1.1s' }}
                  icon={<span className="text-xs font-black">S</span>}
                />

                <TechBubble
                  label="React Native"
                  size={98}
                  className="left-[0%] bottom-[10%] bg-[var(--cream)] animate-float"
                  style={{ animationDelay: '.4s' }}
                  icon={<span className="text-xs font-black">N</span>}
                />
              </div>
            </div>
          </div>
        </section>

        <Separator />

        <section id="projects" className="mx-4 sm:mx-16  scroll-mt-20 px-5 py-20 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <div className="mb-4 h-1 w-10 rounded-full bg-[var(--pink)]" />
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Projects</h2>
            <p className={`mt-3 ${
              lightPreview
                ? 'text-[var(--deep)]'
                : 'text-viola-muted'
            }`}>Here's what I've been working on and learning from.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <Card key={project.title} className="group relative flex h-full flex-col overflow-hidden border-white/10 bg-white/[0.025] transition duration-300 hover:-translate-y-1.5 hover:border-[#c957bc]/45">
                {project.demoAvailable && (
                  <Badge
                    className={`absolute left-3 top-3 z-20 ${
                      lightPreview
                        ? 'border-[#ffc872]/60 bg-[var(--cream)] text-[var(--deep)] shadow-[0_0_16px_rgba(255,200,114,.2)]'
                        : 'border-[#ffe3b3]/30 bg-[#752092]/60 text-[var(--cream)]'
                    }`}
                  >
                    Demo available
                  </Badge>
                )}
                <div className="h-52 overflow-hidden">
                  <ProjectVisual type={project.type} tone={project.tone} />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-xl ${
                    lightPreview
                      ? 'text-[var(--deep)]'
                      : ''
                  }`}>{project.title}</CardTitle>
                  <CardDescription className={`pt-1 leading-6 ${
                    lightPreview
                      ? 'text-[var(--deep)]'
                      : ''
                  }`}>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex items-end justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => <Badge key={tag} variant="outline"  className={
                      lightPreview
                        ? 'border-[var(--gold)]/60 bg-[#ffe3b3]/30 text-[var(--deep)]'
                        : ''
                    }>{tag}</Badge>)}
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      if (project.href?.startsWith('#')) {
                        scrollToId(project.href.slice(1))
                      } else {
                        window.location.href = project.href
                      }
                    }}
                    aria-label={`Learn more about ${project.title}`}
                    className={`shrink-0 ${
                      lightPreview
                        ? 'border-[var(--gold)]/60 bg-[var(--cream)]/40 text-[var(--deep)] hover:bg-[var(--cream)] hover:text-[var(--deep)] group-hover:border-[var(--gold)]'
                        : 'group-hover:bg-[#c957bc]/10'
                    }`}
                  >
                    <ArrowDownRight size={17} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        <section id="about" className="scroll-mt-20 px-5 py-20 sm:px-8">
          <div className="mx-4 sm:mx-16 grid  gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <div>
              <div className="mb-4 h-1 w-10 rounded-full bg-[var(--gold)]" />
              <h2 className="text-3xl font-bold">About me</h2>
              <p
                className={`mt-4 max-w-xl leading-7 ${
                  lightPreview
                    ? 'text-[var(--deep)]'
                    : 'text-viola-muted'
                }`}
              >
                I've always thrived off of creative pursuits, and what better way to express myself than by injecting a little bit of flavour into my corner of the intenet?
                When I'm not programming, I'll be reading, drawing, or off exploring the hills somewhere.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Innovation', 'Integrity', 'Imagination',].map((tag) => <Badge key={tag} variant="gold" className={
                  lightPreview
                    ? 'border-[var(--gold)]/60 bg-[var(--cream)] text-[var(--deep)]'
                    : ''
                }>{tag}</Badge>)}
              </div>
            </div>
            <Separator orientation="vertical" className="hidden h-24 lg:block" />
            <div id="contact" className="scroll-mt-20">
              <div className="mb-4 h-1 w-10 rounded-full bg-[var(--pink)]" />
              <h2 className="text-3xl font-bold">Get in touch</h2>
              <p
                className={`mt-4 max-w-xl leading-7 ${
                  lightPreview
                    ? 'text-[var(--deep)]'
                    : 'text-viola-muted'
                }`}
              >
                To collab, for an opportunity or just a hi — Pop me a message!</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => copyContact('email', email)}
                  className={
                    lightPreview
                      ? 'border-[#ffc872]/60 bg-[#ffe3b3]/35 text-[var(--deep)] hover:bg-[var(--cream)] hover:text-[var(--deep)]'
                      : ''
                  }
                >
                  <Mail size={16} className="mr-2" />
                  {copiedContact === 'email' ? 'Email copied!' : 'Email'}
                </Button>
               <Button
                  variant="outline"
                  onClick={() => copyContact('phone', phone)}
                   className={
                    lightPreview
                      ? 'border-[#ffc872]/60 bg-[#ffe3b3]/35 text-[var(--deep)] hover:bg-[var(--cream)] hover:text-[var(--deep)]'
                      : ''
                  }
                >
                  <Phone size={16} className="mr-2" />
                  {copiedContact === 'phone' ? 'Phone copied!' : 'Phone'}
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className={
                    lightPreview
                      ? 'border-[#ffc872]/60 bg-[#ffe3b3]/35 text-[var(--deep)] hover:bg-[var(--cream)] hover:text-[var(--deep)]'
                      : ''
                  }
                >
                  <a href="https://www.linkedin.com/in/katie-carlisle-a32943375/" target="_blank" rel="noreferrer">
                    <Linkedin size={16} className="mr-2" /> LinkedIn
                    <ExternalLink size={13} className="ml-2 opacity-50" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        className={`border-t px-5 py-7 sm:px-8 ${
          lightPreview
            ? 'border-black/10'
            : 'border-white/10'
        }`}
      >
        <div
          className={`flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between ${
            lightPreview
              ? 'text-[var(--deep)]'
              : 'text-viola-muted'
          }`}
        >
          <span>© {new Date().getFullYear()} Katie Carlisle</span>
        </div>
      </footer>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
