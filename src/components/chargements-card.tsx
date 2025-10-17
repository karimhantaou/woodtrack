import React from 'react';
import ChargementInfo from "@/components/chargement-info";
interface ChargementsCardProps {
  id: number;
  client: string;
  transport: string;
  createdAt: string;
  status: string;
  onAction: () => void;
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
      <div className={"navbar grid grid-cols-5 items-center m-6 p-2 text-sm w-3/4"}>
          <ChargementInfo title={"ID"} text={id} onAction={onAction} />
          <ChargementInfo title={"Client"} text={client} onAction={onAction} />
          <ChargementInfo title={"Transport"} text={transport} onAction={onAction} />
          <ChargementInfo title={"Date"} text={createdAt} onAction={onAction} />
          <ChargementInfo title={"Status"} text={status} onAction={onAction} />
      </div>
  );
};

export default ChargementsCard;