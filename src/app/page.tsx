'use client'

import {useState} from "react";
import { Button } from "@/components/ui/button";
import {fetchChargements} from "@/lib/getChargements";

import chargementsCard, {ChargementsCard} from "@/components/chargements-card";
import ChargementForm from "@/components/chargement-form";

export default function Home() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            {isOpen && <ChargementForm onClose={() => setIsOpen(false)} />}

            <h1>Chargements</h1>

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

            <div className={"flex flex-col items-center justify-center"}>
                <ChargementsCard id={1} client={"Karim Hantaou"} transport={"Transport Alpha"} createdAt={"20/11/2025"} status={"0"}/>
                <ChargementsCard id={2} client={"Sophie Martin"} transport={"Logistique Beta"} createdAt={"15/12/2025"} status={"1"}/>
                <ChargementsCard id={3} client={"Ahmed Benali"} transport={"Express Gamma"} createdAt={"05/01/2026"} status={"2"}/>
            </div>
        </div>
    );
}
