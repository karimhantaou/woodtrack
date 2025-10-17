import { supabase } from "@/lib/supabaseClient";

export async function fetchProduits() {
    const { data, error } = await supabase.from('produits').select('*');
    if (error) {
        return null;
    } else {
        return data;
    }
}