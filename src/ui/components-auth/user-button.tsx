import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
// import { auth } from "../../../auth";
import { UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { SignIn, SignOut } from "./auth-components";
// import { use } from "react";

export default async function UserButton() {
	// const { data: session, status } = useSession();
	// const session = useSession();
	// const session = await auth();
	const { data: session } = useSession();
	if (!session?.user) return <SignIn />;

	console.log("---------session");

	return (
		<div className="flex items-center gap-2">
			<span className="hidden text-sm sm:inline-flex">{session.user.email}</span>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative h-8 w-8 rounded-full">
						{!session?.user?.image ? (
							<>
								<UserIcon className="h-6 w-6 shrink-0 hover:bg-gray-100" aria-hidden="true" />
								<span className="sr-only">Log in</span>
							</>
						) : (
							<Avatar className="h-8 w-8">
								<AvatarImage src={session.user.image} alt={session.user.name ?? ""} />
							</Avatar>
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-50 " align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1 text-center">
							<p className="text-sm font-normal leading-none">{session.user.name}</p>
							<p className="text-sm font-normal leading-none">{session.user.email}</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuItem>
						<SignOut />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
