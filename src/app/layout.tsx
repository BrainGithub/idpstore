import { Inter } from "next/font/google";
import "./globals.css";
import { type ReactNode } from "react";
import { type Metadata } from "next";
import { Footer } from "@/ui/components/Footer";
import { Header } from "@/ui/components/Header";
import { DraftModeNotification } from "@/ui/components/DraftModeNotification";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Axpz",
	description: "Axpz",
	// metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
	// 	? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
	// 	: undefined,
};

export default async function RootLayout(props: {
	children: ReactNode;
	params: Promise<{ channel: string }>;
}) {
	const { children } = props;

	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<SessionProvider>
					{/* <Header channel={props.params.channel} /> */}

					{children}
					<DraftModeNotification />

					{/* <Footer channel={props.params.channel} /> */}
				</SessionProvider>
			</body>
		</html>
	);
}
