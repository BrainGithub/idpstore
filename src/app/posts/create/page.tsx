import Link from "next/link";

import Breadcrumbs from "@/ui/breadcrumbs";
import { createPost } from "../actions";

export default async function Page() {
	return (
		<section className="mx-auto min-h-screen max-w-7xl p-8 pb-16">
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Posts", href: "/posts" },
					{
						label: "Edit Post",
						href: "/posts/edit",
						active: true,
					},
				]}
			/>
			<div className="flex h-full flex-col divide-y divide-gray-200">
				<form action={createPost} className="flex h-full flex-col">
					<h1 className="mb-4 text-xl font-bold">New Draft</h1>

					<div className="mb-4 flex flex-col">
						<input
							type="text"
							name="title"
							placeholder="Title"
							defaultValue=""
							className="w-full rounded-md border border-gray-300 p-2"
							required
						/>
					</div>

					<div className="mb-4 flex h-full flex-grow flex-col">
						<textarea
							name="content"
							placeholder="Content"
							defaultValue=""
							className="min-h-[800px] w-full flex-grow rounded-md border border-gray-300 p-2"
							required
						/>
					</div>

					<div className="mb-4 flex justify-end space-x-4 ">
						<Link href="/posts" className="rounded-md bg-gray-500 p-2 text-white hover:bg-gray-600">
							Cancel
						</Link>
						<button type="submit" className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600">
							Save
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
