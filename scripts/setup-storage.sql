-- Create students table if it doesn't exist
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
CREATE POLICY "Students are viewable by everyone" ON students
  FOR SELECT USING (true);

-- Allow inserts for now (can be restricted later with proper auth)
CREATE POLICY "Students can be inserted" ON students
  FOR INSERT WITH CHECK (true);

-- Allow updates (for delete via soft delete or actual updates)
CREATE POLICY "Students can be updated" ON students
  FOR UPDATE USING (true);

-- Allow deletes
CREATE POLICY "Students can be deleted" ON students
  FOR DELETE USING (true);

-- Create storage bucket for student images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('student-images', 'student-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to student-images bucket
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'student-images');

-- Allow uploads to student-images bucket
CREATE POLICY "Allow uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'student-images');

-- Allow deletion from student-images bucket
CREATE POLICY "Allow deletions" ON storage.objects
  FOR DELETE USING (bucket_id = 'student-images');
