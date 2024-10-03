import Link from "next/link";
import { PowerIcon, UserIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import NavLinks from "@/app/dashboard/ui/nav-links";
import Logo from "./axpz-logo";
import { signOut } from "../../../../auth";
import { redirect } from "next/navigation";

export function SideNav() {
	return (
		<div className="flex h-full flex-col px-3 py-4 md:px-2">
			<Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40" href="/">
				<div className="w-32 text-white md:w-40">
					<Logo />
				</div>
			</Link>
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
				<NavLinks />
				<div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

				<form>
					<Link
						href="/posts"
						className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
					>
						<BookOpenIcon className="w-6" />
						<div className="hidden md:block">Posts</div>
					</Link>
				</form>
				<form>
					<Link
						href="/dashboard/login"
						className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
					>
						<UserIcon className="w-6" />
						<div className="hidden md:block">Sign In</div>
					</Link>
				</form>
				<form
					action={async () => {
						"use server";
						await signOut();
					}}
				>
					<button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
						<PowerIcon className="w-6" />
						<div className="hidden md:block">Sign Out</div>
					</button>
				</form>
			</div>
		</div>
	);
}
