import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL  as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Singleton — HMR da bir necha marta yaratilmaslik uchun
const KEY = '__supabase_client__';
type Client = ReturnType<typeof createClient>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase: Client = (globalThis as any)[KEY] ??
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((globalThis as any)[KEY] = createClient(supabaseUrl, supabaseKey));

export const BUCKET       = 'katalog';
export const WORKS_BUCKET = 'works';

export const getPublicUrl = (path: string) =>
  supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;

export const getWorksUrl = (path: string) =>
  supabase.storage.from(WORKS_BUCKET).getPublicUrl(path).data.publicUrl;
