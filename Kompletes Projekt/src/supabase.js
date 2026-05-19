import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    'https://gzregcrvrladdclgkmdl.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6cmVnY3J2cmxhZGRjbGdrbWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMzk3NDMsImV4cCI6MjA5NDYxNTc0M30.hHKU3r3TZh2k9U-NIBw4rxM9DN39GXJiQj_jDmq5OFI'
)

export default supabase