import {fetchChargementProduits} from "@/lib/getChargementProduits";
import React, {useEffect, useState} from "react";
import { Button } from "@/components/ui/button"

interface produitsProps {
    id: number;
}

export default function Produits({ id, onClose }: { id: number; onClose: () => void }) {

    console.log(id)

    const [produits, setProduits] = useState<any[]>([]);

    async function loadChargements(){
        const data = await fetchChargementProduits(id);
        setProduits(data);
    }

    useEffect(() => {
        loadChargements();
    }, []);

    return(
        <div className={"fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-black/50"} onClick={onClose}>
            <div className={"p-6 flex flex-col gap-1 border-1 border-gray-300 rounded-lg w-2/5 bg-gray-100 shadow-black shadow-xs"}>
                <div className={"w-full mb-2"}>
                    <button onClick={onClose} className="border-1 border-gray-700 flex justify-center items-center w-5 h-5 p-1 hover:bg-gray-700 hover:text-white transition rounded-full">X</button>
                </div>
                    <h2 className={"mb-3"}>Produits :</h2>

                    {produits.map((produit) => (
                        <p key={produit.id}>- {produit.produit.nom}</p>
                    ))}

            </div>
        </div>
    )
}

