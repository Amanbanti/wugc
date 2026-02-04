-- Create students table if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  future_goal TEXT,
  final_words TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
DO $$
BEGIN
  CREATE POLICY "Students are viewable by everyone" ON students
    FOR SELECT USING (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Allow inserts for now (can be restricted later with proper auth)
DO $$
BEGIN
  CREATE POLICY "Students can be inserted" ON students
    FOR INSERT WITH CHECK (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Allow updates (for delete via soft delete or actual updates)
DO $$
BEGIN
  CREATE POLICY "Students can be updated" ON students
    FOR UPDATE USING (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Allow deletes
DO $$
BEGIN
  CREATE POLICY "Students can be deleted" ON students
    FOR DELETE USING (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create storage bucket for student images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('student-images', 'student-images', true)
ON CONFLICT (id) DO NOTHING;

-- Ensure RLS is enabled on storage objects (usually enabled by default in Supabase)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to student-images bucket
DO $$
BEGIN
  CREATE POLICY "student-images: public read" ON storage.objects
    FOR SELECT TO anon, authenticated
    USING (bucket_id = 'student-images');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Allow uploads to student-images bucket
DO $$
BEGIN
  CREATE POLICY "student-images: public insert" ON storage.objects
    FOR INSERT TO anon, authenticated
    WITH CHECK (bucket_id = 'student-images');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Allow updates in student-images bucket (needed if you ever use upsert/replace)
DO $$
BEGIN
  CREATE POLICY "student-images: public update" ON storage.objects
    FOR UPDATE TO anon, authenticated
    USING (bucket_id = 'student-images')
    WITH CHECK (bucket_id = 'student-images');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Allow deletion from student-images bucket
DO $$
BEGIN
  CREATE POLICY "student-images: public delete" ON storage.objects
    FOR DELETE TO anon, authenticated
    USING (bucket_id = 'student-images');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
