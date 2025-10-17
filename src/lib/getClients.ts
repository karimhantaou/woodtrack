import { supabase } from "@/lib/supabaseClient";

export async function fetchClients() {
    const { data, error } = await supabase.from('clients').select('*');
    if (error) {
        return [];
    } else {
        return data;
    }
}