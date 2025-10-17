import { supabase } from "@/lib/supabaseClient";

interface AddChargementParams {
    client_id: number;
    transport_id: number;
}

export async function addChargement({ client_id, transport_id }: AddChargementParams) {
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
