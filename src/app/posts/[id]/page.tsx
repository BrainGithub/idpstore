import { prisma } from "../../../lib/db";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import React from "react";

import Breadcrumbs from "@/ui/breadcrumbs";
import { PostHeader } from "../ui/post-header";

export const metadata = {
	title: "Axpz Posts",
	description: "",
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	let post = await prisma.post.findUnique({
		include: {
			author: true,
		},
		where: {
			id: id,
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
									<div className="subheading-anchor container flex flex-col">
										<ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]} remarkPlugins={[remarkGfm]}>
											{post.content}
										</ReactMarkdown>
									</div>
								</section>
							</article>
						</li>
					</ul>
				)}
			</div>
		</section>
	);
}
