import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://irqifqzfaladppmrrbjl.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlycWlmcXpmYWxhZHBwbXJyYmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MDQwODksImV4cCI6MjA4ODE4MDA4OX0.9ym-Yd-yx6L-fd7twsf-nJTcyIlriEGYw0vyFtxl9X4"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)