import { NextComponentType } from "next";

import React from "react";

interface TableListProps {
    data: {
        id: number;
        name: string;
    }[]
}
const TableList: React.FC<TableListProps> = ({ data }) => {
    return (
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">#</th>
                                <th scope="col" className="px-6 py-4">First</th>
                                <th scope="col" className="px-6 py-4">Last</th>
                                <th scope="col" className="px-6 py-4">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                                    <td className="whitespace-nowrap px-6 py-4">{item.id}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
                                    <td className="whitespace-nowrap px-6 py-4">Wild</td>
                                    <td className="whitespace-nowrap px-6 py-4">@twitter</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TableList
