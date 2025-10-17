import { supabase } from "@/lib/supabaseClient";

export async function fetchChargements() {
    const { data, error } = await supabase.from('chargements').select('*');
    if (error) {
        console.error('Error fetching clients:', error);
    } else {
        console.log(data);
        //return data;
    }
}