'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, type Student } from '@/lib/supabase'
import { ArrowLeft, Quote, Sparkles, Target, X } from 'lucide-react'

export default function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchStudent = async () => {
      const { data } = await supabase
        .from('students')
        .select('*')
        .eq('id', id)
        .single()

      if (data) {
        setStudent(data as Student)
      }
      setLoading(false)
    }

    fetchStudent()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground/60">Loading...</p>
      </main>
    )
  }

  if (!student) {
    return (
      <main className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <Link
              href="/departments"
              className="flex items-center gap-2 text-primary hover:text-accent transition-colors w-fit"
            >
              <ArrowLeft size={20} />
              Back
            </Link>
          </div>
        </header>
        <div className="flex items-center justify-center py-20">
          <p className="text-foreground/60">Student not found</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link
            href={`/department/${student.department.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex items-center gap-2 text-primary hover:text-accent transition-colors w-fit"
          >
            <ArrowLeft size={20} />
            Back to {student.department}
          </Link>
        </div>
      </header>

      {/* Profile Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-b from-card to-background">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-40 right-10 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Photo */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden border border-primary/30 shadow-2xl shadow-black/50 bg-muted">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/10 z-10" />
                <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5]">
                  <Image
                    src={student.image_url || "/placeholder.svg"}
                    alt={student.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 rounded-full bg-black/45 backdrop-blur px-4 py-2 ring-1 ring-white/10">
                  <Sparkles className="h-4 w-4 text-white/90" />
                  <span className="font-cinzel text-[10px] tracking-[0.28em] text-white/90">GRADUATING CLASS</span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 z-20">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-white/90 text-xs ring-1 ring-white/15">
                      {student.department}
                    </span>
                    {student.future_goal && (
                      <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-white/90 text-xs ring-1 ring-white/15">
                        {student.future_goal}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Details */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-bold text-primary hero-text-glow leading-tight">
                {student.name}
              </h1>

              <div className="mt-6 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border bg-card/70 backdrop-blur p-5">
                    <div className="text-xs font-cinzel tracking-[0.28em] text-foreground/60">DEPARTMENT</div>
                    <div className="mt-2 text-lg sm:text-xl font-semibold text-foreground">
                      {student.department}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-card/70 backdrop-blur p-5">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-cinzel tracking-[0.28em] text-foreground/60">FUTURE GOAL</div>
                      <Target className="h-4 w-4 text-accent" />
                    </div>
                    <div className="mt-2 text-lg sm:text-xl font-semibold text-foreground">
                      {student.future_goal || '—'}
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-border bg-card/60 backdrop-blur p-6 sm:p-8 overflow-hidden relative">
                  <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black/20 ring-1 ring-white/10">
                      <Quote className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-xs font-cinzel tracking-[0.28em] text-foreground/60">FINAL WORDS</div>
                      <div className="text-foreground/85 text-sm mt-1">A message from the graduating class</div>
                    </div>
                  </div>

                  <p className="mt-6 font-playfair text-xl sm:text-2xl leading-relaxed text-foreground/95">
                    {student.final_words}
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <motion.button
                      onClick={() => setShowModal(true)}
                      className="px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-accent transition-all duration-300 transform hover:scale-[1.02] font-playfair text-lg shadow-lg shadow-black/30"
                      whileHover={{ scale: 1.02 }}
                    >
                      Read in Fullscreen
                    </motion.button>

                    <Link
                      href={`/department/${student.department.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-8 py-3 border-2 border-primary/60 text-primary rounded-xl hover:bg-primary/10 transition-all duration-300 font-playfair text-lg text-center"
                    >
                      Explore {student.department}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-card border-2 border-primary/70 rounded-2xl max-w-3xl w-full max-h-[80svh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl shadow-black/60"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>

              {/* Modal Content */}
              <h2 className="font-cinzel text-3xl font-bold text-primary mb-6 text-glow pr-8">
                Read My Final Words
              </h2>
              
              <p className="font-playfair text-xl sm:text-2xl leading-relaxed text-foreground/95">
                {student.final_words}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-foreground/60">
            {student.name} - {student.department}
          </p>
          <p className="text-foreground/40 text-sm mt-2">
            Wolkite University Graduating Class
          </p>
        </div>
      </footer>
    </main>
  )
}
