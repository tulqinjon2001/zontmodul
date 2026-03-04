-- ═══════════════════════════════════════════════════════════════════
-- Works jadvaliga o'zbek va rus tillari uchun alohida ustunlar
-- Supabase Dashboard → SQL Editor da bajarishingiz kerak.
-- ═══════════════════════════════════════════════════════════════════

-- 1) Yangi ustunlar (har biri alohida — barcha 4 ta qatorni bajarishingiz kerak)
ALTER TABLE public.works ADD COLUMN IF NOT EXISTS title_uz text;
ALTER TABLE public.works ADD COLUMN IF NOT EXISTS title_ru text;
ALTER TABLE public.works ADD COLUMN IF NOT EXISTS description_uz text;
ALTER TABLE public.works ADD COLUMN IF NOT EXISTS description_ru text;

-- 2) Eski ma'lumotlarni title_uz / description_uz ga to'ldirish (bir marta)
UPDATE public.works
SET
  title_uz = COALESCE(title_uz, title),
  description_uz = COALESCE(description_uz, description)
WHERE title_uz IS NULL OR description_uz IS NULL;

-- Tayyor. Endi admin panelda sarlavha va tavsifni o'zbek va rusda alohida kiritish mumkin.
