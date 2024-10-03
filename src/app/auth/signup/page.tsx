// import { signIn } from "next-auth/react";

// export default function SignUp() {
// 	return (
// 		<div style={{ textAlign: "center", marginTop: "50px" }}>
// 			<h1>Sign up</h1>
// 			{/* <button onClick={() => signIn("github")}>Sign in with GitHub</button> */}
// 		</div>
// 	);
// }

"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		// 注册逻辑，这里可以调用 API 将用户信息存储到数据库
		const response = await fetch("/api/auth/register", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			// 注册成功，跳转到登录页面
			window.location.href = "/auth/signin";
		} else {
			// 处理错误
			console.error("注册失败");
		}
	};

	return (
		<div>
			<h1>注册</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						邮箱:
						<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					</label>
				</div>
				<div>
					<label>
						密码:
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					</label>
				</div>
				<button type="submit">注册</button>
			</form>
			<Link href="/auth/signin">已有账户？登录</Link>
		</div>
	);
}
