-- Bills table
CREATE TABLE IF NOT EXISTS public.bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  amount NUMERIC(14,2) NOT NULL CHECK (amount > 0),
  due_date DATE NOT NULL,
  category TEXT NOT NULL,
  recurring TEXT NOT NULL DEFAULT 'monthly',
  paid BOOLEAN NOT NULL DEFAULT false,
  autopay BOOLEAN NOT NULL DEFAULT false,
  payment_method TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS bills_user_id_idx ON public.bills(user_id, due_date);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bills TO authenticated;
GRANT ALL ON public.bills TO service_role;
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own bills" ON public.bills FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Learn progress table
CREATE TABLE IF NOT EXISTS public.learn_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id INTEGER NOT NULL,
  lesson_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_id, lesson_index)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.learn_progress TO authenticated;
GRANT ALL ON public.learn_progress TO service_role;
ALTER TABLE public.learn_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own progress" ON public.learn_progress FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own subscription" ON public.newsletter_subscribers FOR ALL USING (auth.uid() = user_id OR user_id IS NULL) WITH CHECK (true);
