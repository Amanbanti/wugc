import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Student {
  id: string
  name: string
  department: string
  future_goal: string
  final_words: string
  image_url: string
  created_at: string
}

export const departments = ['Medicine', 'Nursing', 'Medical Laboratory', 'Midwifery']
