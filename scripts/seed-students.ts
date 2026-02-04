import { createClient } from '@supabase/supabase-js'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const departments = ['Medicine', 'Nursing', 'Medical Laboratory', 'Midwifery']

const firstNames = [
  'Abebe', 'Desta', 'Girma', 'Hiwot', 'Kanji', 'Lula', 'Marta', 'Negus',
  'Oshene', 'Petros', 'Rahel', 'Solomon', 'Tigist', 'Uta', 'Workit', 'Yohannes'
]

const lastNames = [
  'Addis', 'Bekele', 'Birru', 'Bogale', 'Bossa', 'Defar', 'Demissie', 'Desta',
  'Dinka', 'Fantaye', 'Gebremedhin', 'Getnet', 'Hailu', 'Habte', 'Hailemariam', 'Kassa'
]

const futureGoals = [
  'Specialized Surgeon',
  'Healthcare Researcher',
  'Community Health Worker',
  'Medical Administrator',
  'Emergency Medicine Specialist',
  'Public Health Officer',
  'Hospital Director',
  'Medical Educator',
  'Clinical Researcher',
  'Healthcare Consultant'
]

const finalWords = [
  'Thank you for the knowledge and experiences. I will serve my community with dedication.',
  'Every challenge has made me stronger. I am ready for the future.',
  'Education is the key to progress. Let us build a better healthcare system.',
  'Proud of my journey. Grateful to my mentors and friends.',
  'The future belongs to those who believe in the beauty of their dreams.',
  'Hard work and determination lead to success. I am proof of that.',
  'Let us use our knowledge to heal and help others.',
  'This is just the beginning of my journey in healthcare.',
  'Thank you to Wolkite University for shaping my career.',
  'I will always remember my time here with pride and gratitude.'
]

// Generate random person placeholder images using UI Avatars
async function generateStudentImage(name: string): Promise<string> {
  const encodedName = encodeURIComponent(name)
  return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&size=400&bold=true&font-size=0.4`
}

async function seedStudents() {
  console.log('Starting to seed students...')

  try {
    for (let i = 0; i < 20; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const name = `${firstName} ${lastName}`
      const department = departments[Math.floor(Math.random() * departments.length)]
      const futureGoal = futureGoals[Math.floor(Math.random() * futureGoals.length)]
      const finalWord = finalWords[Math.floor(Math.random() * finalWords.length)]

      // Get the placeholder image URL
      const imageUrl = await generateStudentImage(name)

      // Insert student data
      const { error } = await supabase
        .from('students')
        .insert({
          name,
          department,
          future_goal: futureGoal,
          final_words: finalWord,
          image_url: imageUrl,
        })

      if (error) {
        console.error(`Error adding ${name}:`, error)
      } else {
        console.log(`✓ Added ${name} from ${department}`)
      }

      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    console.log('✓ Seeding completed successfully!')
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

seedStudents()
