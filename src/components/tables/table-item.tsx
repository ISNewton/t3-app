import { Post } from "@prisma/client";

type TableRowProps = {
    post: Post
}

const TableRow = ({post}:TableRowProps) => {


    return (
        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {post.id}

            </th>
            <td className="px-6 py-4">
            {post.title}

            </td>
            <td className="px-6 py-4">
            {post.description}

            </td>
            <td className="px-6 py-4">
            {post.isActive ? 'Yes' : 'No'}
            </td>
            <td className="pdatax-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
        </tr>
    )
}

export default TableRow