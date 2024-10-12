"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
	return (
		<div style={{ textAlign: "center", marginTop: "50px" }}>
			<h1>Sign out</h1>
			<button onClick={() => signOut()}>Sign out</button>
		</div>
	);
}
