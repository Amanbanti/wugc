'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { supabase, departments, type Student } from '@/lib/supabase'
import { ArrowLeft, Search } from 'lucide-react'

export default function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [students, setStudents] = useState<Student[]>([])
  const [filtered, setFiltered] = useState<Student[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const { slug } = use(params)

  const deptName = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await supabase
        .from('students')
        .select('*')
        .eq('department', deptName)
        .order('name', { ascending: true })

      if (data) {
        setStudents(data as Student[])
        setFiltered(data as Student[])
      }
      setLoading(false)
    }

    fetchStudents()
  }, [deptName])

  useEffect(() => {
    const results = students.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(results)
  }, [search, students])

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link
            href="/departments"
            className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
          >
            <ArrowLeft size={20} />
            Departments
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-b from-card to-background">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="font-playfair text-6xl md:text-7xl font-bold text-center text-primary mb-4 hero-text-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {deptName}
          </motion.h1>
          <motion.p
            className="text-center text-foreground/70 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {students.length} graduating students
          </motion.p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 px-4 bg-background sticky top-20 z-30">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search students by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Students Grid */}
      <section className="py-12 sm:py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-foreground/60">Loading students...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-foreground/60">
                {search ? 'No students found matching your search.' : 'No students in this department yet.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 lg:gap-8">
              {filtered.map((student, i) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (i % 12) * 0.05 }}
                >
                  <Link href={`/student/${student.id}`}>
                    <div className="group cursor-pointer">
                      {/* Movie Poster Style Card */}
                      <div className="relative bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:shadow-black/40">
                        {/* Decorative gradient wash + hover glow */}
                        <div className="pointer-events-none absolute inset-0 opacity-90 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                        <div className="pointer-events-none absolute -inset-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_45%)]" />

                        {/* Image Container */}
                        <div className="relative h-80 sm:h-96 overflow-hidden bg-muted">
                          {student.image_url && (
                            <Image
                              src={student.image_url || "/placeholder.svg"}
                              alt={student.name}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              className="object-cover group-hover:scale-[1.07] transition-transform duration-500"
                            />
                          )}

                          {/* Image overlays */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/15" />

                          {/* Labels */}
                          <div className="absolute top-4 left-4 flex items-center gap-2">
                            <div className="rounded-full bg-black/50 backdrop-blur px-3 py-1 text-white/90 font-cinzel text-[10px] tracking-[0.28em] ring-1 ring-white/10">
                              [ Photo ]
                            </div>
                          </div>

                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center justify-between gap-3">
                              <div className="truncate text-white font-playfair text-xl sm:text-2xl font-bold drop-shadow-[0_10px_24px_rgba(0,0,0,0.85)]">
                                {student.name}
                              </div>
                              <div className="shrink-0 rounded-full bg-white/10 text-white/90 px-3 py-1 text-xs ring-1 ring-white/15">
                                Read →
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Info Section */}
                        <div className="relative p-5 sm:p-6 bg-background/50 backdrop-blur-sm">
                          {/* Department */}
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <p className="text-sm sm:text-base text-muted-foreground font-inter truncate">
                              {student.department}
                            </p>
                            <div className="text-accent font-cinzel text-[10px] sm:text-xs tracking-[0.28em]">
                              [ Final Words ]
                            </div>
                          </div>

                          {/* Future Goal */}
                          <p className="text-sm sm:text-base text-foreground/75 leading-relaxed line-clamp-3">
                            <span className="text-accent font-semibold">Future Goal:</span> {student.future_goal}
                          </p>

                          {/* CTA */}
                          <div className="mt-5 flex items-center justify-between">
                            <div className="text-xs sm:text-sm text-foreground/60">Open profile</div>
                            <div className="text-primary font-semibold transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-foreground/60">
            {deptName} - Wolkite University
          </p>
        </div>
      </footer>
    </main>
  )
}
