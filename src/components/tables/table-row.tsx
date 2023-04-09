import { Post } from "@prisma/client";
import Link from "next/link";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

type TableRowProps = {
    post: Post
}

const TableRow = ({ post }: TableRowProps) => {

    const { mutateAsync } = api.posts.deletePost.useMutation()

    const router = useRouter()


    const handleDeletePost = async () => {

        await mutateAsync(post.id)

        router.reload()

    }


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
            <td className="px-6 py-4">
                <div className="flex ">

                    <Link href={{
                        pathname: `/posts/${post.id}/edit`,
                    }}
                        className="font-medium text-blue-600 dark:text-blue-500
                 hover:underline mr-3"
                    >Edit</Link>
                    <p
                        onClick={handleDeletePost}
                        role="button"
                        className="
                                    font-medium text-red-500 dark:text-red-500
                                  hover:underline"
                    >Delete</p>
                </div>

            </td>
        </tr>
    )
}

export default TableRow