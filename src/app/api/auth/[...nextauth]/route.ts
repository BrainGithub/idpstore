// import { handlers } from "../../../../../auth";
// export const { GET, POST } = handlers;
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
// import { UnstorageAdapter } from "@auth/unstorage-adapter";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
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
  ],
}

export const { GET, POST } = NextAuth(authOptions);