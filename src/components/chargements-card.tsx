import React from 'react';
import {useState} from "react";

import ChargementInfo from "@/components/chargement-info";
import Produits from "@/components/produits";

interface ChargementsCardProps {
  id: number;
  client: string;
  transport: string;
  createdAt: string;
  status: number;
}

// Function qui retourne l'intitulé du status du chargement
function statusString(status:number){
    switch (status) {
        case 0: return "Préparation";
        case 1: return "Livraison";
        case 2: return "Fini";
        default: return "Préparation";
    }
}

// Paramètres
export const ChargementsCard: React.FC<ChargementsCardProps> = ({
    id,
    client,
    transport,
    createdAt,
    status,
}) => {

    // Variable permettant d'ouvir ou fermer le popup des produits.
    const [isOpen, setIsOpen] = useState(false)

  return (
      <div className="bg-stone-100 text-black flex lg:flex-row flex-col items-center justify-between p-2 text-sm w-full shadow-xl/20 rounded-2xl gap-2 ">
          {isOpen && <Produits id={id} onClose={() => setIsOpen(false)} />}
          <p className="flex flex-col md:flex-row items-center justify-between gap-2 w-full">
              <span>Chargement {id}</span>
              <button className="w-1/2 sm:w-auto p-2 hover:bg-stone-700 border-b-1 hover:text-white rounded-2xl transition-all duration-300 shadow-xs" onClick={() => setIsOpen(true)}>Produits</button>
          </p>
          <ChargementInfo title="Client" text={client} />
          <ChargementInfo title="Transport" text={transport} />
          <ChargementInfo title="Date" text={createdAt} />
          <ChargementInfo title="Status" text={statusString(status)} />
      </div>


  );
};

export default ChargementsCard;