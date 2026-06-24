// Supabase client — used only for admin features and AI chat.
// For user data (transactions, budgets, goals, bills), see @/lib/local-storage instead.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

let _supabase: ReturnType<typeof createClient<Database>> | null = null;

function createSupabaseClient() {
  const SUPABASE_URL = (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : undefined) ?? (typeof process !== 'undefined' ? process.env?.SUPABASE_URL : undefined);
  const SUPABASE_PUBLISHABLE_KEY = (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY : undefined) ?? (typeof process !== 'undefined' ? process.env?.SUPABASE_PUBLISHABLE_KEY : undefined);

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    // Return a no-op proxy during SSR/build when env vars aren't set
    // This prevents the app from crashing — admin/chat features simply won't work without real env vars
    console.warn('[Supabase] Missing env vars — admin and chat features require SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY');
    // Return a stub client that won't crash module initialization
    return null as unknown as ReturnType<typeof createClient<Database>>;
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    }
  });
}

export const supabase = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    if (!_supabase) {
      // Return no-op functions for graceful degradation when Supabase isn't configured
      if (prop === 'auth') {
        return {
          getSession: async () => ({ data: { session: null }, error: null }),
          getUser: async () => ({ data: { user: null }, error: null }),
          signInWithPassword: async () => ({ data: {}, error: new Error('Supabase not configured') }),
          signUp: async () => ({ data: {}, error: new Error('Supabase not configured') }),
          signOut: async () => ({ error: null }),
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
          signInWithOAuth: async () => ({ data: {}, error: new Error('Supabase not configured') }),
          exchangeCodeForSession: async () => ({ data: {}, error: new Error('Supabase not configured') }),
        };
      }
      return () => Promise.resolve({ data: null, error: new Error('Supabase not configured') });
    }
    return Reflect.get(_supabase, prop, receiver);
  },
});
