"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const PostFormSchema = z.object({
	id: z.string(),
	title: z.string(),
	content: z.string(),
	published: z.boolean(),
	authorId: z.coerce.number().gt(0, { message: "Please select an user." }),
	date: z.string(),
});

export type State = {
	errors?: {
		title?: string[];
		content?: string[];
	};
	message?: string | null;
};

const UpdatePost = PostFormSchema.omit({ id: true, published: true, authorId: true, date: true });

export async function updatePost(id: string, _prevState: State, formData: FormData) {
	console.log("updatePost");

	let postUrl = "/posts";

	const validatedFields = UpdatePost.safeParse({
		// id: formData.get("id"),
		title: formData.get("title"),
		// authorId: formData.get("authorId"),
		content: formData.get("content"),
	});

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to update.",
		};
	}

	const { title, content } = validatedFields.data;

	console.log("update post:", id, title);

	try {
		const post = await prisma.post.update({
			data: {
				title: title,
				content: content,
			},
			where: {
				id: id,
			},
		});

		postUrl += `/${post.id}`;
		console.log("update post %s", postUrl);
	} catch (e) {
		console.error("update post error %s", e);
		return {
			message: "Failed to update.",
		};
	}

	revalidatePath(postUrl);
	redirect(postUrl);
}

export async function createPost(formData: FormData) {
	let postUrl = "/posts";
	try {
		const title = formData.get("title") as string;
		const content = formData.get("content") as string;

		console.log("create post %s", title);

		const post = await prisma.post.create({
			data: {
				title: title,
				content: content,
			},
		});

		postUrl += `/${post.id}`;
		console.log("created post %s", postUrl);
	} catch (e) {
		console.error("create post error %s", e);
	}

	revalidatePath(postUrl);
	redirect(postUrl);
}

export async function deletePost(id: string) {
	console.log("deletePost", id);

	try {
		const post = await prisma.post.delete({
			where: {
				id: id,
			},
		});

		console.log("Deleted post: %s", post.title);
	} catch (error) {
		console.error("Database Error: Failed to Delete Invoice:", error);
	}

	revalidatePath("/posts");
}

export async function publishPost(id: string, pub: boolean) {
	console.log("publishPost post: %s, %s", id, pub);

	try {
		const post = await prisma.post.update({
			where: {
				id: id,
			},
			data: {
				published: pub,
			},
		});

		console.dir(post);
	} catch (error) {
		console.error("Database Error: ", error);
	}

	revalidatePath("/posts");
	return;
}

export async function cancelPost() {
	console.log("cancelPost");
}
