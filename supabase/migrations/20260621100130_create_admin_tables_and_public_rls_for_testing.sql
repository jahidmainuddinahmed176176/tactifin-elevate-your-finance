-- TEMPORARY TESTING SETUP for admin pages.
-- Creates the missing tables (articles, courses, user_roles) and gives
-- PUBLIC (anon + authenticated) full CRUD access so the admin pages work
-- without login. The pages show an "Admin mode - testing only" banner.
-- REVERT these policies and lock down to admin-only before production.

-- user_roles (referenced by has_role; created here as TEXT for simplicity) ----
CREATE TABLE IF NOT EXISTS public.user_roles (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin','user','editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "public_insert_user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "public_update_user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "public_delete_user_roles" ON public.user_roles;
CREATE POLICY "public_select_user_roles" ON public.user_roles
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_insert_user_roles" ON public.user_roles
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "public_update_user_roles" ON public.user_roles
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "public_delete_user_roles" ON public.user_roles
  FOR DELETE TO anon, authenticated USING (true);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO anon, authenticated;

-- has_role helper (used elsewhere) ------------------------------------------
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role::text = _role
  );
$$;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, TEXT) TO authenticated, anon, service_role;

-- articles ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_articles" ON public.articles;
DROP POLICY IF EXISTS "public_insert_articles" ON public.articles;
DROP POLICY IF EXISTS "public_update_articles" ON public.articles;
DROP POLICY IF EXISTS "public_delete_articles" ON public.articles;
CREATE POLICY "public_select_articles" ON public.articles
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_insert_articles" ON public.articles
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "public_update_articles" ON public.articles
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "public_delete_articles" ON public.articles
  FOR DELETE TO anon, authenticated USING (true);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.articles TO anon, authenticated;

-- courses -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT 'Beginner',
  duration_hours INTEGER NOT NULL DEFAULT 1 CHECK (duration_hours > 0),
  instructor TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS courses_category_published_idx ON public.courses(category, published);
CREATE INDEX IF NOT EXISTS courses_level_idx ON public.courses(level);
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_courses" ON public.courses;
DROP POLICY IF EXISTS "public_insert_courses" ON public.courses;
DROP POLICY IF EXISTS "public_update_courses" ON public.courses;
DROP POLICY IF EXISTS "public_delete_courses" ON public.courses;
CREATE POLICY "public_select_courses" ON public.courses
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_insert_courses" ON public.courses
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "public_update_courses" ON public.courses
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "public_delete_courses" ON public.courses
  FOR DELETE TO anon, authenticated USING (true);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.courses TO anon, authenticated;

-- profiles: add public CRUD (keep existing "own profile" policy) ------------
DROP POLICY IF EXISTS "public_select_profiles" ON public.profiles;
DROP POLICY IF EXISTS "public_insert_profiles" ON public.profiles;
DROP POLICY IF EXISTS "public_update_profiles" ON public.profiles;
DROP POLICY IF EXISTS "public_delete_profiles" ON public.profiles;
CREATE POLICY "public_select_profiles" ON public.profiles
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_insert_profiles" ON public.profiles
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "public_update_profiles" ON public.profiles
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "public_delete_profiles" ON public.profiles
  FOR DELETE TO anon, authenticated USING (true);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO anon;
