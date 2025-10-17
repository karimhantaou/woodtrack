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
  onAction: () => void;
}


function statusString(status:number){
    switch (status) {
        case 0: return "Préparation";
        case 1: return "Livraison";
        case 2: return "Fini";
        default: return "Préparation";
    }
}

export const ChargementsCard: React.FC<ChargementsCardProps> = ({
    id,
    client,
    transport,
    createdAt,
    status,
  onAction,
}) => {

const [isOpen, setIsOpen] = useState(false)

  return (
      <div className={"navbar grid grid-cols-6 items-center p-2 text-sm w-full shadow-xl/20"}>
          {isOpen && <Produits id={id} onClose={() => {setIsOpen(false)}}/>}
          <p className={"w-full"}>Chargement {id}</p>
          <button className={"card w-fit p-2"} onClick={() => setIsOpen(true)}>Produits</button>
          <ChargementInfo title={"Client"} text={client} onAction={onAction} />
          <ChargementInfo title={"Transport"} text={transport} onAction={onAction} />
          <ChargementInfo title={"Date"} text={createdAt} onAction={onAction} />
          <ChargementInfo title={"Status"} text={statusString(status)} onAction={onAction} />
      </div>
  );
};

export default ChargementsCard;