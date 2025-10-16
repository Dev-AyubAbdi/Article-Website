import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    Auth: {
            persistantSession: true,
            autoRefreshToken: true 
    },
    realtime: {
            eventsPerSecond: 10
    }
})

export default supabase