import Link from "next/link";
import { deletePost, publishPost } from "../actions";

export function PublishPost({ post }: any) {
	const publishPostWithId = publishPost.bind(null, post.id, !post.published);

	return (
		<form action={publishPostWithId}>
			<button className="rounded-md p-1 text-sm hover:bg-gray-100">
				{/* {post.published as string} */}
				{post.published ? "unpublish" : "publish"}
			</button>
		</form>
	);
}
