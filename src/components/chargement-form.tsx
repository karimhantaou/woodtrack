import React, {useState} from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/MultiSelect";
import {fetchClients} from "@/lib/getClients";
import {fetchTransports} from "@/lib/getTransports";
import {fetchProduits} from "@/lib/getProduits";
import {addChargement} from "@/lib/addChargements";
import {addChargementProduit} from "@/lib/addChargementProduits";

const clients = await fetchClients();
const transports = await fetchTransports();
const produits = await fetchProduits();

export default function ChargementForm({ onAddChargement, onClose }: any){

    // Récupération des différents inputs
    const [clientId, setClientId] = useState<number>();
    const [transportId, setTransportId] = useState<number>();
    const [produitIds, setProduitIds] = useState<(number)[]>([]);

    //Ajout d'un produit dans la table chargement_produits
    async function addProduit(chargementId:number, produitId:number){
        await addChargementProduit({chargement_id: chargementId, produit_id: produitId});
    }

    // Formulaire soumit
    async function submit(){
        const chargementId = await addChargement({client_id: clientId, transport_id: transportId});
        if(chargementId != null){
            produitIds.forEach((produit) => {
                addProduit(chargementId, produit);
            })
        }
        onAddChargement();
    }

    return(
        <div className={"fixed w-screen h-screen top-0 left-0 flex items-center justify-center"}>
            <div className={"navbar p-6 flex flex-col gap-4 border-2 rounded-lg w-2/5"}>
                <div className={"w-full"}>
                    <button onClick={onClose} className={"bg-white text-sm text-black w-fit rounded-4xl"}> X </button>
                </div>
                    <h2>Nouveau Chargement</h2>
                <div>
                    <label>Client:</label>
                    <Select onValueChange={(value) => setClientId(value)}>
                        <SelectTrigger className="w-full border-none focus:ring-0 focus:ring-offset-0 bg-white text-black">
                            <SelectValue placeholder="Sélectionner un client" />
                        </SelectTrigger>
                        <SelectContent className="border-none">
                            {clients.map((client) => (
                                <SelectItem key={client.id} value={client.id}>
                                    {client.nom} {client.prénom}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Transport:</label>
                    <Select onValueChange={(value) => setTransportId(value)}>
                        <SelectTrigger className="w-full border-none focus:ring-0 focus:ring-offset-0 bg-white text-black">
                            <SelectValue placeholder="Sélectionner un transport" />
                        </SelectTrigger>
                        <SelectContent className="border-none">
                            {transports.map((transport) => (
                                <SelectItem key={transport.id} value={transport.id}>
                                    {transport.nom}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label>Produits:</label>
                    <MultiSelect
                        produits={produits}
                        placeholder="Choisir des fruits..."
                        onChange={(values) => setProduitIds(values)}
                    />
                </div>
                <button type="submit" onClick={submit}>Créer Chargement</button>
            </div>
        </div>
    )
}