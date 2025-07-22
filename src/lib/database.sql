-- Jobs table
CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  job_type VARCHAR(50) NOT NULL CHECK (job_type IN ('Full-Time', 'Part-Time', 'Contract')),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view jobs" ON jobs FOR SELECT USING (true);
CREATE POLICY "Users can insert own jobs" ON jobs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own jobs" ON jobs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own jobs" ON jobs FOR DELETE USING (auth.uid() = user_id);

-- Index for better performance
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX idx_jobs_job_type ON jobs(job_type);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_user_id ON jobs(user_id); 