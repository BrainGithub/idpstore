// import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deletePost, publishPost } from "../actions";
import Date from "../../../lib/date";

export function CreatePost() {
	return (
		<Link
			href="/dashboard/Posts/create"
			className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
		>
			<span className="hidden md:block">Create Post</span> <PlusIcon className="h-5 md:ml-4" />
		</Link>
	);
}

export function UpdatePost({ id }: { id: string }) {
	return (
		<Link href={`/dashboard/Posts/${id}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
			{/* <PencilIcon className="w-2" /> */}
			edit
		</Link>
	);
}

export function EditPost({ post }: any) {
	// const publishPostWithId = publishPost.bind(null, post.id, !post.publish);

	return (
		<Link href={`/posts/${post.id}/edit`} className="rounded-md p-1 text-sm hover:bg-gray-100">
			{/* <PencilIcon className="w-2" /> */}
			edit
		</Link>
	);
}

export function DeletePost({ post }: any) {
	const deletePostWithId = deletePost.bind(null, post.id);

	return (
		<form action={deletePostWithId}>
			<button className="rounded-md p-1 text-sm hover:bg-gray-100">
				{/* <TrashIcon className="w-5" /> */}
				delete
			</button>
		</form>
	);
}

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

export function PostHeader({ post }: any) {
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
			<div className="flex justify-end space-x-1 text-blue-600">
				<EditPost post={post} />
				<PublishPost post={post} />
				<DeletePost post={post} />
			</div>
			{/* </div> */}
		</header>
	);
}
