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
        <div className="flex flex-col items-center justify-center w-full">
            <p className="text-xs">{title}</p>
            <div className="border border-gray-700 px-6 py-1 tracking-wider w-3/4  flex justify-center items-center hover:bg-stone-700 hover:text-white rounded-2xl hover:tracking-widest transition-all duration-300">
                {text}
            </div>
        </div>

    );
};

export default ChargementInfo;