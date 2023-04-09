import { Post } from "@prisma/client";
import Link from "next/link";

type TableRowProps = {
    post: Post
}

const TableRow = ({ post }: TableRowProps) => {


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
                <Link href={{
                    pathname: `/posts/${post.id}/edit`,
                }}
                    className="font-medium text-blue-600 dark:text-blue-500
                 hover:underline"

                >Edit</Link>
            </td>
        </tr>
    )
}

export default TableRow