import { supabase } from "@/lib/supabaseClient";

export async function addChargementProduit(chargement_id: number, produit_id: number) {
    const { data, error } = await supabase
        .from("chargement_produits")
        .insert({ chargement_id, produit_id })
        .select("id")
        .single();

    if (error) {
        console.error("Erreur lors de l'ajout du produit :", error);
        return null;
    }
    return true;
}
