import React, {useState} from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/MultiSelect";
import {fetchClients} from "@/lib/getClients";
import {fetchTransports} from "@/lib/getTransports";
import {fetchProduits} from "@/lib/getProduits"
import {submitForm} from "@/app/actions";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

// Récupération des différents élements à afficher dans les selects du formulaire
const clients = await fetchClients();
const transports = await fetchTransports();
const produits = await fetchProduits();

export default function ChargementForm({onClose}: { onClose: () => void }){

    // Récupération des différents inputs
    const [clientId, setClientId] = useState<number>();
    const [transportId, setTransportId] = useState<number>();
    const [produitIds, setProduitIds] = useState<(number)[]>([]);

    // Formulaire submit
    async function submit() {
        // Si les inputs ne sont pas tous remplis
        if (!clientId || !transportId || produitIds.length === 0) {
            // Affichage d'une notification
            toast("Merci de remplir touts les champs.")
            return;
        }
        await submitForm(clientId, transportId, produitIds);
        toast("Chargement ajouté !")
        onClose();
    }

    return(

        <div className={"fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-black/50"}>
            <Toaster />
            <div className={"p-6 flex flex-col gap-4 border-1 border-stone-500 rounded-lg w-2/5 bg-stone-100 shadow-black shadow-xs"}>
                <div className={"w-full"}>
                    <button onClick={onClose} className="border-1 border-gray-700 flex justify-center items-center w-5 h-5 p-1 hover:bg-stone-700 hover:text-white  transition-all duration-300 rounded-full">X</button>
                </div>
                    <h2>Nouveau Chargement</h2>
                <div>
                    <label>Client:</label>
                    <Select onValueChange={(value) => setClientId(Number(value))}>
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
                    <label>Transporteur:</label>
                    <Select onValueChange={(value) => setTransportId(Number(value))}>
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
                        placeholder="Sélectionner des produits"
                        onChange={(values: (string | number)[]) => {
                            // Convertir chaque élément en number
                            setProduitIds(values.map(v => Number(v)))
                        }}
                    />
                </div>
                <div className={"w-full flex justify-center"}>
                    <button onClick={submit} className={"border-1 border-gray-700 pl-6 pr-6 tracking-wider w-3/4 flex justify-center items-center hover:bg-stone-700 hover:text-white rounded-2xl hover:tracking-widest transition-all duration-300"}>Créer Chargement</button>
                </div>
            </div>
        </div>
    )
}