import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://dcnhmatuqazltqhqsfgu.supabase.co";
const supabaseAnonKey = "sb_publishable_VuyUnNdtMRj9IHxOW7Cq6g_wuTWQJq8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);