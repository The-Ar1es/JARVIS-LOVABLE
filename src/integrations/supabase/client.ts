// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://eqislufrjyttlepugblz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxaXNsdWZyanl0dGxlcHVnYmx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MDcwMjksImV4cCI6MjA2NDk4MzAyOX0.DgRtBqdlr2t8mQHfuqvJu4hTUbwi8UVitAzFa2DdrgE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);