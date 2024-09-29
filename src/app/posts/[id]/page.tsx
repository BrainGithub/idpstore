import { prisma } from "../../../lib/db";
import ReactMarkdown from "react-markdown";

import Breadcrumbs from "@/ui/breadcrumbs";
import { PostHeader } from "../ui/post-header";

export const metadata = {
	title: "Axpz Posts",
	description: "",
};

export default async function Page({ params }: { params: { id: string } }) {
	let post = await prisma.post.findUnique({
		include: {
			author: true,
		},
		where: {
			id: params.id,
		},
	});

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Posts", href: "/posts", active: false },
					{ label: "New", href: "/posts/create", active: true },
				]}
			/>
			<div className="flex flex-col divide-y divide-gray-200">
				{!post ? (
					<p>Post not found</p>
				) : (
					<ul className="flex-1">
						<li key={post.id} className="border-b border-gray-200 py-12">
							<article className="space-y-4">
								<PostHeader post={post} />

								<section className="prose max-w-none">
									<ReactMarkdown>{post.content}</ReactMarkdown>
								</section>
							</article>
						</li>
					</ul>
				)}
			</div>
		</section>
	);
}
