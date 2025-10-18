import React from 'react';

interface ChargementInfoProps {
    title: string;
    text: string;

}

// Paramètres
export const ChargementInfo: React.FC<ChargementInfoProps> = ({
    title,
    text,

}) => {
    return (
            <div className={"flex items-center justify-center flex-col w-full"}>
                <p className={"text-xs"}>{title}</p>
                <div className={"border-1 border-gray-700 pl-6 pr-6 tracking-wider w-3/4 flex justify-center items-center hover:bg-gray-700 hover:text-white rounded-2xl hover:tracking-widest transition-all duration-300"}>
                    {text}
                </div>
            </div>
    );
};

export default ChargementInfo;