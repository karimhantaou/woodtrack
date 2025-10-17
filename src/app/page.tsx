'use client'

import React, {useState} from "react";
import { Button } from "@/components/ui/button";
import {fetchChargements} from "@/lib/getChargements";

import chargementsCard, {ChargementsCard} from "@/components/chargements-card";
import ChargementForm from "@/components/chargement-form";
import {SelectItem} from "@/components/ui/select";

const chargements = fetchChargements();

export default function Home() {

    const [chargements, setChargements] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    function handleAddChargement(){}


    return (
        <div className={"flex justify-center items-center w-full h-5/6"}>
            {isOpen && <ChargementForm onAddChargement={handleAddChargement} onClose={() => setIsOpen(false)} />}


            <div className={"w-9/10 flex flex-col justify-evenly h-full"}>
            <h1 className={"text-4xl"}>Chargements</h1>

            <div>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full button"
                    onClick={() => setIsOpen(true)}
                >
                    +
                </Button>
                Nouveau chargement
            </div>

            <div className={"flex flex-col items-center justify-center overflow-x-scroll"}>
                {chargements.map((chargement) => (
                    <ChargementsCard key={chargement.id} id={chargement.id} client={chargement.client.nom + " " + chargement.client.prénom} transport={chargement.transport.nom} createdAt={chargement.created_at} status={"0"}/>
            ))}
            </div>
            </div>
        </div>
    );
}
