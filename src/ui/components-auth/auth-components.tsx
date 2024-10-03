// "use server";
"use client";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { signIn, signOut, auth } from "../../../auth";
import { Button } from "./ui/button";
import { UserIcon } from "lucide-react";
// import { signOut as nextAuthSignOut } from "next-auth/react";
import { signInAction, signOutAction } from "../../lib/actions/authentication";
import Link from "next/link";

export function SignIn({
	provider,
	...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
	const formAction = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log("---------provider", provider);
		// await signInAction();
		window.location.href = "/api/auth/signin";
	};

	return (
		<form onSubmit={formAction}>
			<Button {...props}>
				<UserIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
				<span className="sr-only">Log in</span>
			</Button>
		</form>
	);
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
	const formAction = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log("---------provider");
		// await signOutAction();
		window.location.href = "/api/auth/signout";
	};
	return (
		// <form onSubmit={formAction}>
		// {/* <Button variant="ghost" className="w-full p-0" {...props}>
		// 	Sign Out
		// </Button> */}
		<Link href="/api/auth/signout" className="w-full items-center p-0 text-center hover:bg-gray-100">
			Sign Out
		</Link>
		// </form>
	);
}
