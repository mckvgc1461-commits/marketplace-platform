import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://khlremgxaifqxnspaemf.supabase.co";
const supabaseAnonKey = "sb_publishable_fG76ZEKDzEEr00jmmu20Qw_ptCCZte5";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);