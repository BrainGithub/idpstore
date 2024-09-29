import { prisma } from "@/lib/db";

import Breadcrumbs from "@/ui/breadcrumbs";
import { EditForm } from "../../ui/edit-form";

interface PageProps {
	params: { [key: string]: any };
	props: any;
}

export default async function Page({ params, props }: PageProps) {
	console.log("edit post", params, props);

	const id = params.id;
	const post = await prisma.post.findUnique({
		include: {
			author: true,
		},
		where: {
			id: id,
		},
	});

	return (
		<section className="mx-auto min-h-screen max-w-7xl p-8 pb-16">
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Posts", href: "/posts", active: false },
					{ label: "Edit", href: "/posts/${id}/edit", active: true },
				]}
			/>

			<EditForm post={post} />
		</section>
	);
}
