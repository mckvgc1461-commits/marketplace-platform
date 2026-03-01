import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://khlremgxaifqxnspaemf.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_fG76ZEkOzEEr00jmmu20Qw_ptCCZ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);