'use server'

import { supabase } from '@/lib/supabase'

const departments = ['Medicine', 'Nursing', 'Medical Laboratory', 'Midwifery']

const firstNames = [
  'Abebe', 'Desta', 'Girma', 'Hiwot', 'Kanji', 'Lula', 'Marta', 'Negus',
  'Oshene', 'Petros', 'Rahel', 'Solomon', 'Tigist', 'Uta', 'Workit', 'Yohannes',
  'Zewdiw', 'Almaz', 'Bethel', 'Chalachew', 'Eleni', 'Fisseha', 'Gebreyes', 'Hafte'
]

const lastNames = [
  'Addis', 'Bekele', 'Birru', 'Bogale', 'Bossa', 'Defar', 'Demissie', 'Desta',
  'Dinka', 'Fantaye', 'Gebremedhin', 'Getnet', 'Hailu', 'Habte', 'Hailemariam', 'Kassa',
  'Kebede', 'Kebene', 'Kidane', 'Kinfe', 'Korsa', 'Kumsa', 'Lema', 'Lemma'
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
  'Healthcare Consultant',
  'Cardiologist',
  'Pediatrician',
  'Oncologist',
  'Neurologist'
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
  'I will always remember my time here with pride and gratitude.',
  'My success is the result of teamwork and perseverance.',
  'I am excited to make a difference in healthcare.',
  'Forever grateful for this opportunity to learn and grow.',
  'The knowledge I gained here will guide my career.'
]

function generateStudentImageUrl(name: string): string {
  const encodedName = encodeURIComponent(name)
  const colors = ['FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8', 'F7DC6F', 'BB8FCE', '85C1E2']
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  return `https://ui-avatars.com/api/?name=${encodedName}&background=${randomColor}&color=fff&size=400&bold=true`
}

export async function seedDummyData() {
  try {
    let addedCount = 0

    for (let i = 0; i < 24; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const name = `${firstName} ${lastName}`
      const department = departments[Math.floor(Math.random() * departments.length)]
      const futureGoal = futureGoals[Math.floor(Math.random() * futureGoals.length)]
      const finalWord = finalWords[Math.floor(Math.random() * finalWords.length)]
      const imageUrl = generateStudentImageUrl(name)

      const { error } = await supabase.from('students').insert({
        name,
        department,
        future_goal: futureGoal,
        final_words: finalWord,
        image_url: imageUrl,
      })

      if (!error) {
        addedCount++
      }
    }

    return {
      success: true,
      message: `Successfully added ${addedCount} dummy students!`,
      count: addedCount,
    }
  } catch (error) {
    console.error('Seed error:', error)
    return {
      success: false,
      message: 'Error seeding dummy data',
      error: String(error),
    }
  }
}
