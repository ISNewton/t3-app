import { NextComponentType } from "next";

import React from "react";
import TableRow from "./table-item";

interface TableListProps {
    data: {
        id: number;
        name: string;
    }[]
}
const TableList: React.FC<TableListProps> = ({ data }) => {
    return (
       
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {data.map((row) => <TableRow key={row.id} row={row} />)}
            
           
        </tbody>
    </table>
</div>

    );
};

export default TableList
