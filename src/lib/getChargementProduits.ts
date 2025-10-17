import { supabase } from "@/lib/supabaseClient";

export async function fetchChargementProduits(chargement_id : number) {
    const { data, error } = await supabase.from('chargement_produits').select('id, produit:produits (nom)').eq('chargement_id', chargement_id);
    if (error) {
        return [];
    } else {
        return data;
    }
}