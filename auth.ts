import NextAuth, { type NextAuthConfig } from "next-auth";
import "next-auth/jwt";
import { z } from "zod";
// import Apple from "next-auth/providers/apple";
// import Auth0 from "next-auth/providers/auth0";
// import AzureB2C from "next-auth/providers/azure-ad-b2c";
// import BankIDNorway from "next-auth/providers/bankid-no";
// import BoxyHQSAML from "next-auth/providers/boxyhq-saml";
// import Cognito from "next-auth/providers/cognito";
// import Coinbase from "next-auth/providers/coinbase";
// import Discord from "next-auth/providers/discord";
// import Dropbox from "next-auth/providers/dropbox";
// import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
// import GitLab from "next-auth/providers/gitlab";
// import Google from "next-auth/providers/google";
// import Hubspot from "next-auth/providers/hubspot";
// import Keycloak from "next-auth/providers/keycloak";
// import LinkedIn from "next-auth/providers/linkedin";
// import Netlify from "next-auth/providers/netlify";
// import Okta from "next-auth/providers/okta";
// import Passage from "next-auth/providers/passage";
// import Passkey from "next-auth/providers/passkey";
// import Pinterest from "next-auth/providers/pinterest";
// import Reddit from "next-auth/providers/reddit";
// import Slack from "next-auth/providers/slack";
// import Salesforce from "next-auth/providers/salesforce";
// import Spotify from "next-auth/providers/spotify";
// import Twitch from "next-auth/providers/twitch";
// import Twitter from "next-auth/providers/twitter";
// import Vipps from "next-auth/providers/vipps";
// import WorkOS from "next-auth/providers/workos";
// import Zoom from "next-auth/providers/zoom";
import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";
// import vercelKVDriver from "unstorage/drivers/vercel-kv";
import { UnstorageAdapter } from "@auth/unstorage-adapter";
import Credentials from "next-auth/providers/credentials";
// import { random } from "lodash-es";

const storage = createStorage({
	driver: memoryDriver(),
});

const config = {
	theme: { logo: "https://authjs.dev/img/logo-sm.png" },
	adapter: UnstorageAdapter(storage),
	providers: [
		// Apple,
		// Auth0,
		// AzureB2C({
		//   clientId: process.env.AUTH_AZURE_AD_B2C_ID,
		//   clientSecret: process.env.AUTH_AZURE_AD_B2C_SECRET,
		//   issuer: process.env.AUTH_AZURE_AD_B2C_ISSUER,
		// }),
		// BankIDNorway,
		// BoxyHQSAML({
		//   clientId: "dummy",
		//   clientSecret: "dummy",
		//   issuer: process.env.AUTH_BOXYHQ_SAML_ISSUER,
		// }),
		// Cognito,
		// Coinbase,
		// Discord,
		// Dropbox,
		// Facebook,
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID as string,
			clientSecret: process.env.AUTH_GITHUB_SECRET as string,
		}),
		Credentials({
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(6) })
					.safeParse(credentials);

				if (parsedCredentials.success) {
					console.log("-----------", credentials);
					const user = { id: "0", name: "admin", email: "admin@zx.com" };
					if (credentials?.email === "admin@zx.com" && credentials?.password === "123456") {
						return user;
					} else {
						return null;
					}
				}

				console.log("Invalid credentials");
				return null;
			},
		}),
		// GitLab,
		// Google,
		// Hubspot,
		// Keycloak({ name: "Keycloak (bob/bob)" }),
		// LinkedIn,
		// Netlify,
		// Okta,
		// Passkey({
		// 	formFields: {
		// 		email: {
		// 			label: "Username",
		// 			required: true,
		// 			autocomplete: "username webauthn",
		// 		},
		// 	},
		// 	authorize: async (credentials: { email: string }) => {
		// 		// Implement your authorization logic here
		// 		return { id: "1", name: "User", email: credentials.email };
		// 	},
		// }),
		// Passage,
		// Pinterest,
		// Reddit,
		// Salesforce,
		// Slack,
		// Spotify,
		// Twitch,
		// Twitter,
		// Vipps({
		//   issuer: "https://apitest.vipps.no/access-management-1.0/access/",
		// }),
		// WorkOS({
		//   connection: process.env.AUTH_WORKOS_CONNECTION!,
		// }),
		// Zoom,
	],
	// basePath: "/api/auth",
	// pages: {
	// 	signIn: "/authaa/signin",
	// 	signOut: "/authaa/signout",
	// 	error: "/authaa/error",
	// 	verifyRequest: "/authaa/verify-request",
	// 	newUser: "/authaa/signup",
	// },
	session: {
		// Customize session management
		strategy: "jwt",
		generateSessionToken: () => crypto.randomUUID(),
	},
	callbacks: {
		jwt({ token, trigger, session, account }) {
			if (trigger === "update") token.name = session.user.name;
			if (account?.provider === "keycloak") {
				return { ...token, accessToken: account.access_token };
			}
			return token;
		},
		async session({ session, token }) {
			if (token?.accessToken) {
				session.accessToken = token.accessToken;
			}
			return session;
		},
		// async signIn(params) {
		// 	// Log the login to the database
		// 	// await prisma.loginRecord.create({
		// 	//   data: {
		// 	// 	email: user.email,
		// 	// 	name: user.name,
		// 	// 	provider: account.provider,
		// 	// 	createdAt: new Date(),
		// 	//   },
		// 	// });
		// 	// return true; // Allow sign-in
		// 	console.log("signIn", params);
		// 	return true;
		// },
	},
	// events: {
	// 	signOut: async (message) => {
	// 		console.log("signOut", message);
	// 	}
	// experimental: {
	// 	enableWebAuthn: true,
	// },
	debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

declare module "next-auth" {
	interface Session {
		accessToken?: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		accessToken?: string;
	}
}
