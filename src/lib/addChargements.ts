import { supabase } from "@/lib/supabaseClient";

export async function addChargement(client_id: number, transport_id: number) {
    const { data, error } = await supabase
        .from("chargements")
        .insert({ client_id, transport_id })
        .select("id")
        .single();

    if (error) {
        console.error("Erreur lors de l'ajout du chargement :", error);
        return null;
    }

    return data?.id;
}
