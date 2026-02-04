'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { departments } from '@/lib/supabase'
import {
  ArrowLeft,
  Baby,
  Building2,
  HeartPulse,
  Microscope,
  Stethoscope,
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

export default function DepartmentsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
          >
            <ArrowLeft size={20} />
            Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-b from-card to-background">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="font-playfair text-6xl md:text-7xl font-bold text-center text-primary mb-4 hero-text-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Academic Departments
          </motion.h1>
          <motion.p
            className="text-center text-foreground/70 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our four distinguished departments
          </motion.p>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="relative py-20 px-4 bg-background overflow-hidden">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-foreground">
                Choose a department
              </h2>
              <p className="mt-2 text-foreground/70">
                Browse {departments.length} departments and view graduating students.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-8">
            {departments.map((dept, i) => {
              const deptSlug = dept.toLowerCase().replace(/\s+/g, '-')
              const meta = getDepartmentMeta(dept)
              const Icon = meta.Icon

              return (
                <motion.div
                  key={dept}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/department/${deptSlug}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer border border-border bg-card shadow-sm shadow-black/30 hover:shadow-xl hover:shadow-black/40 hover:border-primary/50"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${meta.accent} opacity-100 transition-opacity duration-500`} />
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
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-foreground/60">
            Wolkite University Departments
          </p>
        </div>
      </footer>
    </main>
  )
}
