import { supabase } from "@/lib/supabaseClient";

export async function fetchChargements() {
    const { data, error } = await supabase
        .from("chargements")
        .select(`
    id,
    client:clients ( nom, prénom ),
    transport:transports ( nom ),
    created_at::date,
    status
    `);

    if (error) {
        console.error('Error fetching clients:', error);
        return [];
    } else {
        return data;
    }
}