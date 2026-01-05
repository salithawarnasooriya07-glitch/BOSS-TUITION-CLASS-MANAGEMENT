import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fxgotqjjvlcqqwvyjydx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4Z290cWpqdmxjcXF3dnlqeWR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyMDEwMTUsImV4cCI6MjA4Mjc3NzAxNX0.E2ef7PRPaVpdT7aof_T1JOOalf44WWmoqNb4--GBl7c'

export const supabase = createClient(supabaseUrl, supabaseKey)
