import { supabase } from "@/lib/supabaseClient";

export async function addClient(nom: string, prénom: string, email:string) {
    const { data, error } = await supabase
        .from("clients")
        .insert({ nom, prénom, email })
    if (error) {
        console.error("Erreur lors de l'ajout du client :", error);
        return false;
    } else{
        return true
    }
}
