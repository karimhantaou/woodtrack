import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/MultiSelect";
import {fetchClients} from "@/lib/getClients";
import {fetchTransports} from "@/lib/getTransports";
import {fetchProduits} from "@/lib/getProduits";

const clients = await fetchClients();
const transports = await fetchTransports();
const produits = await fetchProduits();

const OPTIONS = [
    { label: "Pommes", value: "pommes" },
    { label: "Bananes", value: "bananes" },
    { label: "Poires", value: "poires" },
];

export default function ChargementForm({ onClose }: { onClose: () => void }){
    return(
        <div className={"fixed w-screen h-screen top-0 left-0 flex items-center justify-center"}>
            <form className={"navbar p-6 flex flex-col gap-4 border-2 rounded-lg"}>
                <button onClick={onClose} className={"bg-white text-sm text-black"}>Fermer le formulaire</button>
                <h2>Nouveau Chargement</h2>
                <div>
                    <label>Client:</label>
                    <Select>
                        <SelectTrigger className="w-full border-none focus:ring-0 focus:ring-offset-0 bg-white text-black">
                            <SelectValue placeholder="Sélectionner un client" />
                        </SelectTrigger>
                        <SelectContent className="border-none">
                            {clients.map((client) => (
                                <SelectItem key={client.id} value={client.id.toString()} className="">
                                    {client.nom} {client.prénom}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Transport:</label>
                    <Select onValueChange={(value) => console.log("Transport choisi:", value)}>
                        <SelectTrigger className="w-full border-none focus:ring-0 focus:ring-offset-0 bg-white text-black">
                            <SelectValue placeholder="Sélectionner un transport" />
                        </SelectTrigger>
                        <SelectContent className="border-none">
                            {transports.map((transport) => (
                                <SelectItem key={transport.id} value={transport.id.toString()} className="">
                                    {transport.nom}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Status:</label>
                    <Select onValueChange={(value) => console.log("Transport choisi:", value)}>
                        <SelectTrigger className="w-full border-none focus:ring-0 focus:ring-offset-0 bg-white text-black">
                            <SelectValue placeholder="Sélectionner un transport" />
                        </SelectTrigger>
                        <SelectContent className="border-none">
                            {transports.map((transport) => (
                                <SelectItem key={transport.id} value={transport.id.toString()} className="">
                                    {transport.nom}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Produits:</label>
                    <MultiSelect
                        options={OPTIONS}
                        placeholder="Choisir des fruits..."
                        onChange={(values) => console.log(values)}
                    />
                </div>
                <button type="submit">Créer Chargement</button>
            </form>
        </div>
    )
}