"use client";

// import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { updatePost, State } from "../actions";
import { useState } from "react";

export function EditForm({ post }: any) {
	console.log("useActionState", useState);

	const initialState: State = { message: null, errors: {} };

	// const updatePostWithId = updatePost.bind(null, post.id);
	const [state, setState] = useState(initialState);

	const formAction = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		// const data = Object.fromEntries(formData.entries());
		const result = await updatePost(post.id, state, formData);
		setState(result);
	};

	// const handleCancel = () => {
	// 	console.log("Cancel Button");
	// 	cancelPost
	// };
	// const handleCancel = Promise.all(cancelPost);

	return (
		// <form action={formAction}>
		// 	<input type="hidden" name="id" value={post.id} />

		<form onSubmit={formAction} className="flex h-full flex-col">
			<input type="hidden" name="id" value={post.id} />
			<div className="mb-4 flex flex-col">
				<input
					type="text"
					name="title"
					placeholder="Title"
					defaultValue={post.title}
					className="w-full rounded-md border border-gray-300 p-2"
				/>
			</div>

			<div className="mb-4 flex h-full flex-grow flex-col">
				<textarea
					name="content"
					placeholder="Content"
					defaultValue={post.content}
					className="min-h-[800px] w-full flex-grow rounded-md border border-gray-300 p-2"
				/>
			</div>

			<div className="mb-4 flex justify-end space-x-4 ">
				<Link href="/posts" className="rounded-md bg-gray-500 p-2 text-white hover:bg-gray-600">
					Cancel
				</Link>
				{/* <button type="button" onClick={handleCancel}>
					Cancel Button
				</button> */}
				<button type="submit" className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600">
					Save
				</button>
			</div>
		</form>
	);
}
