import { supabase } from "@/lib/supabaseClient";

export async function addProduit(nom: string) {
    const { data, error } = await supabase
        .from("produits")
        .insert({ nom })
    if (error) {
        console.error("Erreur lors de l'ajout du produit :", error);
        return false;
    } else{
        return true
    }
}
