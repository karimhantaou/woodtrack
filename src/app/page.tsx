'use client'

import {useState, useEffect} from "react";
import { Button } from "@/components/ui/button";
import {ChargementsCard} from "@/components/chargements-card";
import ChargementForm from "@/components/chargement-form";
import {fetchChargements} from "@/lib/getChargements";

export default function Home() {

    // Variable useState qui serront mis à jours
    const [chargements, setChargements] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false)


    // Fonction qui met à jour la liste des chargements
    async function loadChargements(){
        const data = await fetchChargements();
        setChargements(data);
    }

    // UseEffect
    useEffect(() => {
        loadChargements();
    }, []);


    return (
        <div className="flex justify-center items-center w-full h-4/5 p-5">
            {/* Formulaire d'ajout de chargement */}
            {isOpen && (
                <ChargementForm
                    onClose={() => {
                        setIsOpen(false);
                        loadChargements();
                    }}
                />
            )}
            <div className="w-9/10 flex flex-col h-full">
                <div className="flex items-center gap-2 text-black">
                    <p className={"text-4xl"}>Chargements</p>
                    <p>({chargements.length})</p>
                </div>

                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>

                <div className="flex items-center gap-3 mb-4 ">

                    {/* Bouton ouvrant le formulaire d'ajout de chargement */}

                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-gray-700 hover:bg-gray-700 hover:text-white transition"
                        onClick={() => setIsOpen(true)}
                    >
                        +
                    </Button>
                    <p className={"text-black"}>Nouveau chargement</p>
                </div>

                <div className="flex flex-col flex-1 overflow-auto p-2 border-2 gap-2 rounded-2xl bg-gray-200 shadow-2xs">

                    {chargements.length == 0 ? (
                        <p className={"w-full h-full flex justify-center items-center"}>Aucun chargement disponible.</p>
                    ) : (

                        chargements.map((chargement) => (
                            <ChargementsCard
                                key={chargement.id}
                                id={chargement.id}
                                client={`${chargement.client.nom} ${chargement.client.prénom}`}
                                transport={chargement.transport.nom}
                                createdAt={chargement.created_at}
                                status={chargement.status}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>

    );
}
