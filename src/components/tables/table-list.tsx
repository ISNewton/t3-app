import { NextComponentType } from "next";

import React from "react";
import TableRow from "./table-item";
import { Post } from "@prisma/client";


type TableListProps = {
    posts: Post[]
}

const TableList = (props:TableListProps) => {
    
    return (
       
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Post title
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Is active
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>

            {props.posts.map((post) => (
                <TableRow key={post.id} post={post} />
            ))}
           
        </tbody>
    </table>
</div>

    );
};

export default TableList
