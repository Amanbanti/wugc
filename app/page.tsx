'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase, departments } from '@/lib/supabase'
import {
  Baby,
  Building2,
  ChevronDown,
  GraduationCap,
  HeartPulse,
  Microscope,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react'

function getDepartmentMeta(dept: string): {
  Icon: React.ComponentType<{ className?: string }>
  blurb: string
  accent: string
} {
  const normalized = dept.toLowerCase()

  if (normalized.includes('medicine')) {
    return {
      Icon: Stethoscope,
      blurb: 'Clinical excellence and compassionate care',
      accent: 'from-emerald-500/25 to-cyan-500/20',
    }
  }

  if (normalized.includes('nursing')) {
    return {
      Icon: HeartPulse,
      blurb: 'Professional practice with heart',
      accent: 'from-rose-500/25 to-amber-500/20',
    }
  }

  if (normalized.includes('laboratory') || normalized.includes('lab')) {
    return {
      Icon: Microscope,
      blurb: 'Discovery, diagnostics, and precision',
      accent: 'from-violet-500/25 to-indigo-500/20',
    }
  }

  if (normalized.includes('midwifery')) {
    return {
      Icon: Baby,
      blurb: 'Safe births and maternal wellbeing',
      accent: 'from-sky-500/25 to-fuchsia-500/20',
    }
  }

  return {
    Icon: Building2,
    blurb: 'Explore students and their final words',
    accent: 'from-primary/20 to-accent/15',
  }
}

const heroImages = [
  {
    src: '/hero-group.jpg',
    alt: 'Wolkite University Graduating Class',
  },
  {
    src: '/hero-fireworks.jpg',
    alt: 'Wolkite University celebration',
  },
  {
    src: '/hero-speaker.jpg',
    alt: 'Wolkite University graduation speech',
  },
]

export default function Home() {
  const [studentCount, setStudentCount] = useState(0)
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true })
      setStudentCount(count || 0)
    }
    fetchCount()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex(i => (i + 1) % heroImages.length)
    }, 6000)

    return () => clearInterval(id)
  }, [])

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[100svh] sm:h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={heroImages[heroIndex]?.src}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            >
              <Image
                src={heroImages[heroIndex]?.src ?? '/hero-group.jpg'}
                alt={heroImages[heroIndex]?.alt ?? 'Wolkite University'}
                fill
                priority={heroIndex === 0}
                sizes="100vw"
                className="object-cover object-top sm:object-center"
                quality={90}
              />
            </motion.div>
          </AnimatePresence>
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/85" />
          {/* Accent glows for readability */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
            <div className="absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
          </div>
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mx-auto w-full max-w-4xl py-10 sm:py-12">
            <motion.div
              className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-4 py-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <Sparkles className="h-4 w-4 text-white/90" />
              <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.32em] text-white/90">
                CLASS OF 2026 • GRADUATING SHOWCASE
              </span>
            </motion.div>

            <motion.h1
              className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-5 drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)]"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent">
                Wolkite University
              </span>
            </motion.h1>

            <motion.p
              className="font-inter text-sm sm:text-base md:text-lg text-white/90 tracking-[0.22em] uppercase mb-4 drop-shadow-[0_10px_26px_rgba(0,0,0,0.85)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Read My Final Words
            </motion.p>

            <motion.p
              className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-white/90 mb-8 font-light leading-relaxed drop-shadow-[0_10px_26px_rgba(0,0,0,0.85)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
            >
              Graduating Class Student Showcase — explore departments, meet the graduates, and read the messages they leave behind.
            </motion.p>

            <motion.div
              className="mx-auto mb-10 flex flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-black/45 border border-white/10 px-4 py-2 text-white/90">
                <Users className="h-4 w-4" />
                <span className="text-sm">{studentCount} Students</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-black/45 border border-white/10 px-4 py-2 text-white/90">
                <GraduationCap className="h-4 w-4" />
                <span className="text-sm">{departments.length} Departments</span>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05 }}
            >
              <Link
                href="/departments"
                className="px-9 py-3.5 bg-white text-black rounded-xl hover:bg-white/90 transition-all duration-300 transform hover:scale-[1.03] font-playfair text-lg shadow-lg shadow-black/40"
              >
                Explore Departments
              </Link>
              <Link
                href="/admin"
                className="px-9 py-3.5 border-2 border-white/70 text-white rounded-xl hover:bg-white/10 transition-all duration-300 font-playfair text-lg"
              >
                Admin Panel
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <span className="text-xs tracking-[0.25em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="font-playfair text-5xl font-bold text-primary mb-2 text-glow">
                {studentCount}
              </p>
              <p className="text-foreground/80 text-lg">Graduating Students</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="font-playfair text-5xl font-bold text-accent mb-2 text-glow">
                {departments.length}
              </p>
              <p className="text-foreground/80 text-lg">Departments</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Departments Preview */}
      <section className="relative py-20 px-4 bg-background overflow-hidden">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <motion.h2
            className="font-playfair text-5xl font-bold text-center mb-16 text-primary hero-text-glow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Academic Departments
          </motion.h2>

          <motion.p
            className="mx-auto -mt-10 mb-12 max-w-2xl text-center text-foreground/75"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Choose a department to explore graduating students and read their final words.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-8">
            {departments.map((dept, i) => (
              <motion.div
                key={dept}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {(() => {
                  const meta = getDepartmentMeta(dept)
                  const Icon = meta.Icon
                  return (
                <Link href={`/department/${dept.toLowerCase().replace(/\s+/g, '-')}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer border border-border bg-card shadow-sm shadow-black/30 hover:shadow-xl hover:shadow-black/40 hover:border-primary/50"
                  >
                    {/* Accent wash */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${meta.accent} opacity-100 transition-opacity duration-500`} />
                    {/* Subtle highlight on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%)]" />

                    <div className="relative h-full p-7 sm:p-8 flex flex-col">
                      <div className="flex items-start justify-between">
                        <div className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-black/30 ring-1 ring-white/10">
                          <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                        </div>
                        <div className="text-white/80 text-xs font-cinzel tracking-[0.28em]">[ Open ]</div>
                      </div>

                      <div className="mt-5">
                        <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.75)]">
                          {dept}
                        </h3>
                        <p className="mt-2 text-sm sm:text-base text-white/85 leading-relaxed">
                          {meta.blurb}
                        </p>
                      </div>

                      <div className="mt-auto pt-5 flex items-center justify-between">
                        <span className="text-sm text-white/85">View students</span>
                        <span className="text-white/95 text-base font-semibold transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
                  )
                })()}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-foreground/60 mb-2">
            Wolkite University Graduating Class Showcase
          </p>
          <p className="text-foreground/40 text-sm">
            © 2026 All rights reserved
          </p>
        </div>
      </footer>
    </main>
  )
}
