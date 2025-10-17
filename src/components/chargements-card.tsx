import React from 'react';
import ChargementInfo from "@/components/chargement-info";
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



  return (
      <div className={"navbar grid grid-cols-5 items-center mb-4 p-2 text-sm w-full shadow-xl/20"}>
          <p className={"w-full"}>Chargement {id}</p>
          <ChargementInfo title={"Client"} text={client} onAction={onAction} />
          <ChargementInfo title={"Transport"} text={transport} onAction={onAction} />
          <ChargementInfo title={"Date"} text={createdAt} onAction={onAction} />
          <ChargementInfo title={"Status"} text={statusString(status)} onAction={onAction} />
      </div>
  );
};

export default ChargementsCard;