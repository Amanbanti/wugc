'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { supabase, departments, type Student } from '@/lib/supabase'
import { ArrowLeft, Search } from 'lucide-react'

export default function DepartmentPage({
  params,
}: {
  params: { slug: string }
}) {
  const [students, setStudents] = useState<Student[]>([])
  const [filtered, setFiltered] = useState<Student[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const deptName = params.slug
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
      <section className="py-12 px-4 bg-background">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                      <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                        {/* Image Container */}
                        <div className="relative h-72 sm:h-80 overflow-hidden bg-muted">
                          {student.image_url && (
                            <Image
                              src={student.image_url || "/placeholder.svg"}
                              alt={student.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                          {/* Photo Label */}
                          <div className="absolute top-3 left-3 text-accent font-cinzel text-xs tracking-wider">
                            [ Photo ]
                          </div>
                        </div>

                        {/* Info Section */}
                        <div className="p-4 sm:p-5 bg-background/50 backdrop-blur-sm">
                          {/* Name */}
                          <h3 className="font-playfair text-lg sm:text-xl font-bold text-foreground mb-2 leading-tight">
                            {student.name}
                          </h3>

                          {/* Department */}
                          <p className="text-sm sm:text-base text-muted-foreground mb-3 font-inter">
                            {student.department}
                          </p>

                          {/* Future Goal */}
                          <p className="text-xs sm:text-sm text-foreground/70 mb-3 leading-relaxed line-clamp-2">
                            <span className="text-accent font-semibold">Future Goal:</span> {student.future_goal}
                          </p>

                          {/* Final Words Label */}
                          <div className="text-accent font-cinzel text-xs tracking-wider group-hover:text-primary transition-colors">
                            [ Read My Final Words ]
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
