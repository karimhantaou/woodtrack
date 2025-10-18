import {addChargement} from "@/lib/addChargements";
import {addChargementProduit} from "@/lib/addChargementProduits";

export async function submitForm(client_id: number, transport_id: number, produis: number[]) {

    // Ajoute un chargement.
    const chargementId = await addChargement(client_id, transport_id);

    // Ajout des produits dans chargement_produits si l'ajout du chargement à marché.
    if(chargementId != null){
        produis.forEach((produit) => {
            addChargementProduit(chargementId, produit);
        })
    }
}
