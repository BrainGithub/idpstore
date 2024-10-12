"use client";

// import { signIn } from "next-auth/react";
// import AxpzLogo from "@/ui/axpz-logo";
// import LoginForm from "@/ui/login-form";

// import { auth } from "../../../../auth";

// import { useSession } from "next-auth/react";

// export default async function SignIn() {
// 	const session = auth();
// 	console.log("----session----", session);
// 	return (
// 		<main className="flex items-center justify-center md:h-screen">
// 			<div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
// 				{/* <div style={{ textAlign: "center", marginTop: "50px" }}>
// 					<div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
// 						<div className="w-32 text-white md:w-36">
// 							<AxpzLogo />
// 						</div>
// 					</div>
// 					<LoginForm />

// 					<div style={{ textAlign: "center", marginTop: "50px" }}>
// 						<h1>Sign in</h1>
// 						<button onClick={() => signIn("github")}>Sign in with GitHub</button>
// 					</div>
// 				</div> */}
// 				<div>这是一个服务器组件</div>;
// 			</div>
// 		</main>
// 	);
// }

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
// import { signIn, signOut, auth } from "../../../../auth";
// import { signIn } from "../../../../auth";

export default function SignIn() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await signIn("credentials", {
			redirect: false,
			username,
			password,
		});

		if (result?.error) {
			console.error(result?.error);
		} else {
			window.location.href = "/";
		}
	};
	// return signIn();

	return (
		<div>
			<h1>登录</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						用户名:
						<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
					</label>
				</div>
				<div>
					<label>
						密码:
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					</label>
				</div>
				<button type="submit">登录</button>
			</form>
			<div>
				<Link href="/auth/signup">没有账户？注册</Link>
			</div>
		</div>
	);
}
