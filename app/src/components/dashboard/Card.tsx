import React from 'react';

const Card = ({ title, value, percentage, icon }: { title: string, value: number, percentage?: number, icon: any }) => {
    return (
        <div className="w-full bg-white text-black p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{title}</h2>
                {icon}
                {/* <div className="text-red-500">{percentage ?? ""}</div> */}
            </div>
            <div className="mt-2 text-3xl font-bold">{value}</div>
        </div>
    );
};

export default Card;
