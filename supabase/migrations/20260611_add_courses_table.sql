-- Courses table for learning management
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT 'Beginner',
  duration_hours INTEGER NOT NULL DEFAULT 1,
  instructor TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS courses_category_published_idx ON public.courses(category, published);
CREATE INDEX IF NOT EXISTS courses_level_idx ON public.courses(level);

-- Grant permissions
GRANT SELECT ON public.courses TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.courses TO authenticated;
GRANT ALL ON public.courses TO service_role;

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Admin-only policies for CRUD
CREATE POLICY "Admin can manage courses" ON public.courses
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Users can only view published courses
CREATE POLICY "Users can view published courses" ON public.courses
  FOR SELECT
  USING (published = true OR auth.uid() IS NULL);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_courses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER courses_updated_at_trigger
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION update_courses_updated_at();
