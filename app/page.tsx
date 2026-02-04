'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { supabase, departments } from '@/lib/supabase'

export default function Home() {
  const [studentCount, setStudentCount] = useState(0)

  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true })
      setStudentCount(count || 0)
    }
    fetchCount()
  }, [])

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-group.jpg"
            alt="Wolkite University Graduating Class"
            fill
            priority
            className="object-cover"
            quality={90}
          />
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-4 hero-text-glow drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Wolkite University
          </motion.h1>
          
          <motion.p
            className="font-cinzel text-base sm:text-lg md:text-xl text-accent tracking-widest mb-8 text-glow drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Read My Final Words
          </motion.p>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-foreground/95 mb-12 font-light tracking-wide drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Graduating Class Student Showcase
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link
              href="/departments"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-all duration-300 transform hover:scale-105 font-playfair text-lg"
            >
              Explore Departments
            </Link>
            <Link
              href="/admin"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-all duration-300 font-playfair text-lg"
            >
              Admin Panel
            </Link>
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
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="font-playfair text-5xl font-bold text-center mb-16 text-primary hero-text-glow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Academic Departments
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, i) => (
              <motion.div
                key={dept}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/department/${dept.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="group relative h-48 rounded-lg overflow-hidden cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 group-hover:from-primary/60 group-hover:to-accent/60 transition-all duration-500 z-10" />
                    <div className="absolute inset-0 bg-card group-hover:bg-background/50 transition-all duration-500" />
                    <div className="relative h-full flex items-center justify-center z-20">
                      <h3 className="font-playfair text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 text-center px-4">
                        {dept}
                      </h3>
                    </div>
                  </div>
                </Link>
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
