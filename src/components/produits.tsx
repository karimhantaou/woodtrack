import {fetchChargementProduits} from "@/lib/getChargementProduits";
import React, {useEffect, useState} from "react";
import { Button } from "@/components/ui/button"

// Paramètre
interface produitsProps {
    id: number;
}

export default function Produits({ id, onClose }: { id: number; onClose: () => void }) {

    // Liste des produits
    const [produits, setProduits] = useState<any[]>([]);

    async function loadChargements(){
        const data = await fetchChargementProduits(id);
        setProduits(data);
    }

    useEffect(() => {
        loadChargements();
    }, []);

    return(
        <div className={"fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-black/50"}>
            <div className={"p-6 flex flex-col gap-4 border-1 border-stone-500 rounded-lg md:w-2/5 bg-stone-100 shadow-black shadow-xs w-9/10"}>
                <div className={"w-full mb-2"}>
                    <button onClick={onClose} className="border-1 border-gray-700 flex justify-center items-center w-5 h-5 p-1 hover:bg-stone-700 hover:text-white  transition-all duration-300 rounded-full">X</button>
                </div>
                    <h2 className={"mb-3"}>Produits :</h2>

                    {produits.map((produit) => (
                        <p key={produit.id}>- {produit.produit.nom}</p>
                    ))}

            </div>
        </div>
    )
}

