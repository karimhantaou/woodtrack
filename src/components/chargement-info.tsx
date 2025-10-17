import React from 'react';

interface ChargementInfoProps {
    title: string;
    text: string;
    onAction: () => void;
}

export const ChargementInfo: React.FC<ChargementInfoProps> = ({
    title,
    text,
    onAction,
}) => {
    return (
            <div className={"flex items-center justify-center flex-col w-full"}>
                <p className={"text-sm"}>{title}</p>
                <div className={"border-2 border-gray-200 cardInfo pl-6 pr-6 tracking-wider"}>
                    {text}
                </div>
            </div>
    );
};

export default ChargementInfo;