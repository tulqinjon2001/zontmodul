-- ═══════════════════════════════════════════════════════════════════
-- Ish uchun bir nechta rasm (slideshow) — work_images jadvali
-- Supabase Dashboard → SQL Editor da barcha qatorlarni bajarishingiz kerak.
-- ═══════════════════════════════════════════════════════════════════

-- 1) work_images jadvali
CREATE TABLE IF NOT EXISTS public.work_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id uuid NOT NULL REFERENCES public.works(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 2) Tez qidirish uchun indeks
CREATE INDEX IF NOT EXISTS idx_work_images_work_id ON public.work_images(work_id);

-- 3) RLS yoqish
ALTER TABLE public.work_images ENABLE ROW LEVEL SECURITY;

-- 4) Eski policy larni o'chirish (qayta ishlatish uchun)
DROP POLICY IF EXISTS "Anyone can view work_images" ON public.work_images;
DROP POLICY IF EXISTS "Authenticated can insert work_images" ON public.work_images;
DROP POLICY IF EXISTS "Authenticated can update work_images" ON public.work_images;
DROP POLICY IF EXISTS "Authenticated can delete work_images" ON public.work_images;

-- 5) Yangi policy lar
CREATE POLICY "Anyone can view work_images"
  ON public.work_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can insert work_images"
  ON public.work_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update work_images"
  ON public.work_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete work_images"
  ON public.work_images FOR DELETE
  TO authenticated
  USING (true);

-- Tayyor. Endi sayt va admin panel work_images dan foydalana oladi.
