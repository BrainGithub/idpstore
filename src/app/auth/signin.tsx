// pages/auth/signin.tsx

import { signIn } from "next-auth/react";

export default function SignIn() {
	return (
		<div style={{ textAlign: "center", marginTop: "50px" }}>
			<h1>Sign in</h1>
			<button onClick={() => signIn("github")}>Sign in with GitHub</button>
		</div>
	);
}
