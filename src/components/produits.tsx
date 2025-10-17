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
        <div className={"fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-opacity-50 "}>
            <div className={"navbar p-6 flex flex-col gap-4 border-2 rounded-lg w-2/5"}>
                <div className={"w-full"}>
                    <button onClick={onClose} className="bg-white text-sm w-6 h-6 text-black rounded-full flex items-center justify-center hover:bg-gray-200 hover:text-gray-800 active:bg-gray-300 active:scale-90 transition duration-150 ease-in-out">X</button>
                </div>
                    <h2>Produits :</h2>

                    {produits.map((produit) => (
                        <p key={produit.id}>- {produit.produit.nom}</p>
                    ))}

            </div>
        </div>
    )
}

