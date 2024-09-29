// pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
	// Configure GitHub authentication
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID, // GitHub Client ID
			clientSecret: process.env.GITHUB_CLIENT_SECRET, // GitHub Client Secret
		}),
	],
	// Configure the session behavior
	session: {
		strategy: "jwt",
	},
	// Optional: Add custom sign-in, error, or sign-out pages
	pages: {
		signIn: "/auth/signin", // Custom sign-in page
	},
});
