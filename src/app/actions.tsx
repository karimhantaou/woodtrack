"use server";

import {addChargement} from "@/lib/addChargements";
import {addChargementProduit} from "@/lib/addChargementProduits";

import { revalidatePath } from "next/cache";

export async function submitForm(client_id: number, transport_id: number, produis: number[]) {

    const chargementId = await addChargement(client_id, transport_id);
    if(chargementId != null){
        produis.forEach((produit) => {
            addChargementProduit(chargementId, produit);
        })
    }

    revalidatePath("/");
}
