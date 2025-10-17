import { supabase } from "@/lib/supabaseClient";

export async function fetchTransports() {
    const { data, error } = await supabase.from('transports').select('*');
    if (error) {
        return null;
    } else {
        return data;
    }
}