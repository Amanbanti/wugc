-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  future_goal TEXT NOT NULL,
  final_words TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create storage bucket for student images
INSERT INTO storage.buckets (id, name, public)
VALUES ('student-images', 'student-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for students table
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON students FOR SELECT
  USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert"
  ON students FOR INSERT
  WITH CHECK (true);

-- Add some sample data
INSERT INTO students (name, department, future_goal, final_words, image_url) VALUES
('Abebe Assefa', 'Medicine', 'Cardiologist', 'I aspire to become a cardiologist and help patients with heart diseases. This journey with my classmates has been unforgettable.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'),
('Almaz Tadesse', 'Medicine', 'Surgeon', 'My dream is to perform complex surgeries and contribute to advancing surgical techniques in Ethiopia.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'),
('Amare Tekle', 'Medicine', 'General Practitioner', 'I want to serve rural communities and provide accessible healthcare to those in need.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'),
('Belay Mesfin', 'Nursing', 'Critical Care Nurse', 'My passion is to provide excellent patient care in intensive care units and support families during difficult times.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop'),
('Bethel Girma', 'Nursing', 'Nurse Manager', 'I aim to lead nursing teams and improve healthcare delivery standards in hospitals.', 'https://images.unsplash.com/photo-1500595046891-f6a2c4d09fb4?w=400&h=400&fit=crop'),
('Bosena Yohannes', 'Nursing', 'Community Health Nurse', 'My goal is to educate communities about health and disease prevention through community-based programs.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'),
('Chaltu Aberra', 'Medical Laboratory', 'Laboratory Director', 'I aspire to establish and manage diagnostic laboratories with advanced equipment and skilled technicians.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'),
('Dawit Assefa', 'Medical Laboratory', 'Clinical Pathologist', 'My dream is to contribute to medical research and improve diagnostic accuracy through laboratory science.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'),
('Desta Woldemariam', 'Medical Laboratory', 'Medical Technologist', 'I want to work in modern diagnostic laboratories and help physicians make accurate clinical decisions.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop'),
('Edna Habte', 'Midwifery', 'Midwife Educator', 'My passion is to train future midwives and ensure safe maternal health care for all mothers.', 'https://images.unsplash.com/photo-1500595046891-f6a2c4d09fb4?w=400&h=400&fit=crop'),
('Elena Tesfaye', 'Midwifery', 'Clinical Midwife', 'I aim to provide compassionate care during pregnancy, labor, and postpartum periods.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'),
('Fantu Mekonnen', 'Midwifery', 'Maternal Health Officer', 'My goal is to reduce maternal mortality and improve women''s reproductive health services.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop');
