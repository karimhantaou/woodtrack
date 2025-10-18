import { supabase } from "@/lib/supabaseClient";

export async function addTransport(nom: string) {
    const { data, error } = await supabase
        .from("transports")
        .insert({ nom })
    if (error) {
        console.error("Erreur lors de l'ajout du transporteur :", error);
        return false;
    } else{
        return true
    }
}
