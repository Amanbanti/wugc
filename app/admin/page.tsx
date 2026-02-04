'use client'

import React from "react"

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { supabase, departments } from '@/lib/supabase'
import { seedDummyData } from '@/app/actions/seed'
import { ArrowLeft, Upload, Loader, Trash2, Zap } from 'lucide-react'

const ADMIN_EMAIL = 'amanbanti2011@gmail.com'
const ADMIN_PASSWORD = '123456'

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    department: departments[0],
    future_goal: '',
    final_words: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState('')
  const [students, setStudents] = useState<any[]>([])
  const [deleting, setDeleting] = useState<string | null>(null)
  const [seeding, setSeeding] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch students
  React.useEffect(() => {
    if (isLoggedIn) {
      const fetchStudents = async () => {
        const { data } = await supabase
          .from('students')
          .select('*')
          .order('created_at', { ascending: false })
        setStudents(data || [])
      }
      fetchStudents()
    }
  }, [isLoggedIn])

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      setEmail('')
      setPassword('')
    } else {
      setLoginError('Invalid email or password')
    }
  }

  // Image Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = e => setImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  // Seed Handler
  const handleSeedData = async () => {
    setSeeding(true)
    try {
      const result = await seedDummyData()
      setUploadMessage(result.success ? `✓ ${result.message}` : 'Error seeding data')
      
      // Refresh student list
      const { data } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })
      setStudents(data || [])
    } catch (error) {
      console.error('Seed error:', error)
      setUploadMessage('Error seeding dummy data')
    } finally {
      setSeeding(false)
    }
  }

  // Delete Handler
  const handleDelete = async (studentId: string, imageUrl: string) => {
    setDeleting(studentId)
    try {
      // Extract filename from URL
      const fileName = imageUrl.split('/').pop()
      if (fileName) {
        await supabase.storage
          .from('student-images')
          .remove([fileName])
      }

      // Delete from database
      await supabase
        .from('students')
        .delete()
        .eq('id', studentId)

      setStudents(students.filter(s => s.id !== studentId))
      setUploadMessage('✓ Student deleted successfully!')
      setTimeout(() => setUploadMessage(''), 3000)
    } catch (error) {
      console.error('Delete error:', error)
      setUploadMessage('Error deleting student. Please try again.')
    } finally {
      setDeleting(null)
    }
  }

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageFile || !formData.name.trim()) {
      setUploadMessage('Please fill all fields and select an image')
      return
    }

    setUploading(true)
    setUploadMessage('')

    try {
      // Upload image
      const fileName = `${Date.now()}-${imageFile.name}`
      const { error: uploadError } = await supabase.storage
        .from('student-images')
        .upload(fileName, imageFile)

      if (uploadError) throw uploadError

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('student-images').getPublicUrl(fileName)

      // Add student to database
      const { error: insertError } = await supabase.from('students').insert({
        name: formData.name,
        department: formData.department,
        future_goal: formData.future_goal,
        final_words: formData.final_words,
        image_url: publicUrl,
      })

      if (insertError) throw insertError

      setUploadMessage('✓ Student added successfully!')
      setFormData({
        name: '',
        department: departments[0],
        future_goal: '',
        final_words: '',
      })
      setImageFile(null)
      setImagePreview('')
      if (fileInputRef.current) fileInputRef.current.value = ''
      
      // Refresh student list
      const { data } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })
      setStudents(data || [])
    } catch (error) {
      console.error('Upload error:', error)
      setUploadMessage('Error uploading student. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-card rounded-lg border border-border p-8">
            <h1 className="font-playfair text-4xl font-bold text-primary mb-8 text-center">
              Admin Login
            </h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-foreground/80 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="amanbanti2011@gmail.com"
                />
              </div>

              <div>
                <label className="block text-foreground/80 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••"
                />
              </div>

              {loginError && (
                <p className="text-destructive text-sm">{loginError}</p>
              )}

              <button
                type="submit"
                className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-all duration-300 font-semibold"
              >
                Login
              </button>
            </form>

            <p className="text-foreground/50 text-xs text-center mt-4">
              Demo Credentials: amanbanti2011@gmail.com / 123456
            </p>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
          >
            <ArrowLeft size={20} />
            Home
          </Link>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 border border-primary text-primary hover:bg-primary/10 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Admin Panel */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="bg-card rounded-lg border border-border p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-playfair text-4xl font-bold text-primary">
                Add Student
              </h1>
              <button
                onClick={handleSeedData}
                disabled={seeding}
                className="px-4 py-2 bg-accent/10 text-accent hover:bg-accent/20 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 text-sm font-semibold"
              >
                {seeding && <Loader size={16} className="animate-spin" />}
                {seeding ? 'Seeding...' : 'Add Dummy Data'}
              </button>
            </div>
            <p className="text-foreground/60 mb-8">
              Upload a new graduating student to the showcase
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-foreground/80 mb-2 font-semibold">
                  Student Photo
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                >
                  {imagePreview ? (
                    <div className="relative w-48 h-48 mx-auto">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ) : (
                    <div className="text-foreground/60">
                      <Upload size={24} className="mx-auto mb-2" />
                      <p>Click to upload student photo</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-foreground/80 mb-2 font-semibold">
                  Student Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-foreground/80 mb-2 font-semibold">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={e =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Future Goal */}
              <div>
                <label className="block text-foreground/80 mb-2 font-semibold">
                  Future Goal
                </label>
                <input
                  type="text"
                  value={formData.future_goal}
                  onChange={e =>
                    setFormData({ ...formData, future_goal: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g., Specialized Surgeon"
                  required
                />
              </div>

              {/* Final Words */}
              <div>
                <label className="block text-foreground/80 mb-2 font-semibold">
                  Read My Final Words
                </label>
                <textarea
                  value={formData.final_words}
                  onChange={e =>
                    setFormData({ ...formData, final_words: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors h-24 resize-none"
                  placeholder="Share your final words or thoughts..."
                  required
                />
              </div>

              {uploadMessage && (
                <motion.p
                  className={`text-sm font-semibold ${
                    uploadMessage.includes('✓')
                      ? 'text-accent'
                      : 'text-destructive'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {uploadMessage}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={uploading}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-all duration-300 font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {uploading && <Loader size={20} className="animate-spin" />}
                {uploading ? 'Uploading...' : 'Add Student'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Students List Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="font-playfair text-3xl font-bold text-primary mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Manage Students ({students.length})
          </motion.h2>

          {students.length === 0 ? (
            <p className="text-foreground/60 text-center py-8">No students added yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-foreground/80 font-semibold">Name</th>
                    <th className="text-left py-4 px-4 text-foreground/80 font-semibold">Department</th>
                    <th className="text-left py-4 px-4 text-foreground/80 font-semibold">Future Goal</th>
                    <th className="text-left py-4 px-4 text-foreground/80 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-border hover:bg-card/50 transition-colors">
                      <td className="py-4 px-4 text-foreground">{student.name}</td>
                      <td className="py-4 px-4 text-foreground">{student.department}</td>
                      <td className="py-4 px-4 text-foreground/80">{student.future_goal}</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleDelete(student.id, student.image_url)}
                          disabled={deleting === student.id}
                          className="px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                          {deleting === student.id ? (
                            <Loader size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                          {deleting === student.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-foreground/60">Admin Panel - Wolkite University</p>
        </div>
      </footer>
    </main>
  )
}
