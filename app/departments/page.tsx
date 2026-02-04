'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { departments } from '@/lib/supabase'
import { ArrowLeft } from 'lucide-react'

export default function DepartmentsPage() {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null)

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
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept, i) => {
              const deptSlug = dept.toLowerCase().replace(/\s+/g, '-')
              return (
                <motion.div
                  key={dept}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredDept(dept)}
                  onMouseLeave={() => setHoveredDept(null)}
                >
                  <Link href={`/department/${deptSlug}`}>
                    <div className="group relative bg-card rounded-lg overflow-hidden cursor-pointer border border-border hover:border-primary transition-all duration-500 h-80">
                      {/* Background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-500" />

                      {/* Content */}
                      <div className="relative h-full flex flex-col items-center justify-center p-8 z-10">
                        <h2 className="font-playfair text-4xl font-bold text-primary mb-4 text-center group-hover:text-accent transition-colors duration-300">
                          {dept}
                        </h2>
                        
                        <p className="text-foreground/70 text-center mb-6 text-sm">
                          Excellence in healthcare education
                        </p>

                        <motion.div
                          className="px-6 py-2 border border-primary text-primary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          View Students
                        </motion.div>
                      </div>

                      {/* Hover effect border */}
                      <div className="absolute inset-0 rounded-lg pointer-events-none border-2 border-transparent group-hover:border-primary transition-all duration-500" />
                    </div>
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
