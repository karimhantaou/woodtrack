import {fetchChargementProduits} from "@/lib/getChargementProduits";
import React, {useEffect, useState} from "react";
import { Button } from "@/components/ui/button"

/*
Type entrée en paramètre:
- 0 : Client
- 1 : Produit
- 2 : Transporteur

*/


// Paramètre
interface addDataFormProps {
    type: number;
}

export default function AddDataForm({ type, onClose }: { type: number; onClose: () => void }) {

    return(
        <div className={"fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-black/50"}>
            <div className={"p-6 flex flex-col gap-1 border-1 border-gray-300 rounded-lg w-2/5 bg-gray-100 shadow-black shadow-xs"}>
                <div className={"w-full mb-2"}>
                    <button onClick={onClose} className="border-1 border-gray-700 flex justify-center items-center w-5 h-5 p-1 hover:bg-gray-700 hover:text-white transition rounded-full">X</button>
                </div>
                    <h2 className={"mb-3"}>Produits :</h2>

                {type}


            </div>
        </div>
    )
}

