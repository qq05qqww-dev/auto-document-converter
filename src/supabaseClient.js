import { createClient } from '@supabase/supabase-js'

// batch018-53-1：Supabase 連線資料備援修正
// 優先讀取 Vite 環境變數；若本機 / Vercel 尚未正確注入，改用公開 publishable key 備援。
// 注意：這裡不是 service_role / secret key，可以放前端。
const FALLBACK_SUPABASE_URL = 'https://cdyuweikhbfgkfrezhxd.supabase.co'
const FALLBACK_SUPABASE_ANON_KEY = 'sb_publishable_nc-vY2-GIr_jkEvS3YIUEQ_vw8bImsk'

const envSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const envSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

const supabaseUrl = envSupabaseUrl || FALLBACK_SUPABASE_URL
const supabaseAnonKey = envSupabaseAnonKey || FALLBACK_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null

export const supabaseConnectionInfo = {
  hasEnvUrl: Boolean(envSupabaseUrl),
  hasEnvAnonKey: Boolean(envSupabaseAnonKey),
  usingFallback: !envSupabaseUrl || !envSupabaseAnonKey
}
