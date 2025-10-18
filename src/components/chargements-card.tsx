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
      <div className={"bg-stone-100 text-black grid grid-cols-5 items-center p-2 text-sm w-full shadow-xl/20 rounded-2xl"}>
          {isOpen && <Produits id={id} onClose={() => {setIsOpen(false)}}/>}
          <p className={"w-full flex items-center justify-between"}>
              Chargement {id}
              <button className={"w-fit p-2 hover:bg-stone-700 border-b-1 hover:text-white rounded-2xl transition-all duration-300 shadow-xs"} onClick={() => setIsOpen(true)}>Produits</button>
          </p>
          <ChargementInfo title={"Client"} text={client}/>
          <ChargementInfo title={"Transport"} text={transport} />
          <ChargementInfo title={"Date"} text={createdAt} />
          <ChargementInfo title={"Status"} text={statusString(status)} />
      </div>
  );
};

export default ChargementsCard;