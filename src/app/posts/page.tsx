import { prisma } from "../../lib/db";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import React from "react";
import Breadcrumbs from "@/ui/breadcrumbs";
import { PostHeader } from "./ui/post-header";
import { auth } from "../../../auth";

export const metadata = {
	title: "Axpz Posts",
	description: "",
};

export default async function Page() {
	// console.dir(props);
	// console.log("----posts----", props);

	let posts: any[] = [];
	const session = await auth();
	if (session) {
		posts = await prisma.post.findMany({
			include: {
				author: true,
			},
			orderBy: {
				updatedAt: "desc",
			},
		});
	} else {
		posts = await prisma.post.findMany({
			where: {
				published: true,
			},
			include: {
				author: true,
			},
			orderBy: {
				updatedAt: "desc",
			},
		});
	}

	// const totalCount = await prisma.post.count();

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Posts", href: "/posts", active: true },
					{ label: "New", href: "/posts/create", active: true },
				]}
			/>
			<div className="flex flex-col divide-y divide-gray-200">
				<ul className="flex-1">
					{posts.map((post) => (
						<li key={post.id} className="border-b border-gray-200 py-12">
							<article className="space-y-4">
								<PostHeader post={post} />
								<section className="prose max-w-none">
									<div className="container">
										<ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]} remarkPlugins={[remarkGfm]}>
											{post.content
												? post.content.slice(0, 500) + (post.content.length > 500 ? "..." : "")
												: ""}
										</ReactMarkdown>
									</div>
								</section>
								{/* <footer className="flex items-center justify-between text-gray-500">
									<small>
										By {post.author?.name} &nbsp;on &nbsp;
										<Date dateString={post.updatedAt.toISOString()} />
									</small>
								</footer> */}
							</article>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
