'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, type Student } from '@/lib/supabase'
import { ArrowLeft, X } from 'lucide-react'

export default function StudentPage({
  params,
}: {
  params: { id: string }
}) {
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchStudent = async () => {
      const { data } = await supabase
        .from('students')
        .select('*')
        .eq('id', params.id)
        .single()

      if (data) {
        setStudent(data as Student)
      }
      setLoading(false)
    }

    fetchStudent()
  }, [params.id])

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
      <section className="py-20 px-4 bg-gradient-to-b from-card to-background">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            {/* Student Photo */}
            <motion.div
              className="relative w-64 h-64 rounded-lg overflow-hidden mb-8 shadow-2xl border-4 border-primary/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {student.image_url && (
                <Image
                  src={student.image_url || "/placeholder.svg"}
                  alt={student.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              )}
            </motion.div>

            {/* Student Info */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="font-playfair text-5xl font-bold text-primary mb-4 hero-text-glow">
                {student.name}
              </h1>
              
              <div className="flex flex-col gap-2 text-foreground/80">
                <p className="text-lg">
                  <span className="font-semibold text-accent">Department:</span> {student.department}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-accent">Future Goal:</span> {student.future_goal}
                </p>
              </div>
            </motion.div>

            {/* Read My Final Words Button */}
            <motion.button
              onClick={() => setShowModal(true)}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-all duration-300 transform hover:scale-105 font-playfair text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              Read My Final Words
            </motion.button>
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
              className="bg-card border-2 border-primary rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-8 relative"
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
              
              <p className="font-playfair text-xl leading-relaxed text-foreground/90">
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
