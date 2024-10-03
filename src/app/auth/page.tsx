"use client";

// import { signIn } from "next-auth/react";
import AxpzLogo from "@/ui/axpz-logo";
import LoginForm from "@/ui/login-form";

// import { useSession } from "next-auth/react";

export default async function SignIn() {
	// console.log("----session----", useSession());
	return (
		<main className="flex items-center justify-center md:h-screen">
			<div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
				<div style={{ textAlign: "center", marginTop: "50px" }}>
					<div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
						<div className="w-32 text-white md:w-36">
							<AxpzLogo />
						</div>
					</div>
					<LoginForm />

					{/* <div style={{ textAlign: "center", marginTop: "50px" }}>
						<h1>Sign in</h1>
						<button onClick={() => signIn("github")}>Sign in with GitHub</button>
					</div> */}
				</div>
				<div>这是一个client组件</div>;
			</div>
		</main>
	);
}
