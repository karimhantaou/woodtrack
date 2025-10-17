'use client'

import {useState, useEffect} from "react";
import { Button } from "@/components/ui/button";
import {ChargementsCard} from "@/components/chargements-card";
import ChargementForm from "@/components/chargement-form";
import {fetchChargements} from "@/lib/getChargements";

export default function Home() {

    const [chargements, setChargements] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false)

    async function loadChargements(){
        const data = await fetchChargements();
        setChargements(data);
    }

    useEffect(() => {
        loadChargements();
    }, []);


    return (
        <div className="flex justify-center items-center w-full h-5/6">
            {isOpen && (
                <ChargementForm
                    onClose={() => {
                        setIsOpen(false);
                        loadChargements();
                    }}
                />
            )}

            <div className="w-9/10 flex flex-col h-full">

                <h1 className="text-4xl mb-4">Chargements</h1>

                <div className="flex items-center gap-3 mb-4">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full button"
                        onClick={() => setIsOpen(true)}
                    >
                        +
                    </Button>
                    <span>Nouveau chargement</span>
                </div>

                <div className="flex flex-col flex-1 overflow-auto p-2 border-2 gap-2 border-amber-950 mb-2">
                    {chargements.map((chargement) => (
                        <ChargementsCard
                            key={chargement.id}
                            id={chargement.id}
                            client={`${chargement.client.nom} ${chargement.client.prénom}`}
                            transport={chargement.transport.nom}
                            createdAt={chargement.created_at}
                            status={chargement.status}
                        />
                    ))}
                </div>
            </div>
        </div>

    );
}
