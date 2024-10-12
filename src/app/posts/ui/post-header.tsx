// import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { PublishPost, DeletePost, EditPost } from "./buttons";
// import { auth } from "../../../../auth";
import Date from "../../../lib/date";
import { useSession } from "next-auth/react";

export async function PostHeader({ post }: any) {
	const session = useSession();

	return (
		<header>
			<h2 className="text-center text-3xl font-bold text-blue-600 hover:underline">
				<Link href={`/posts/${post.id}`}>{post.title}</Link>
			</h2>
			<div className="justify-right text-right text-gray-500">
				<small className="justify-right text-right">
					By {post.author?.name} &nbsp;on &nbsp;
					<Date dateString={post.updatedAt.toISOString()} />
				</small>
			</div>
			{session && (
				<div className="flex justify-end space-x-1 text-blue-600">
					<EditPost post={post} />
					<PublishPost post={post} />
					<DeletePost post={post} />
				</div>
			)}
			{/* </div> */}
		</header>
	);
}
