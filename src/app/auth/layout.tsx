// import { Footer } from "@/ui/components/Footer";
// import { Header } from "@/ui/components/Header";

export const metadata = {
	// title: "Saleor Storefront example",
	// description: "Starter pack for building performant e-commerce experiences with Saleor.",
};

export default function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props;
	return (
		<div className="flex h-full min-h-[calc(100dvh-64px)] flex-col">
			<main className="h-full flex-1">{children}</main>
		</div>
	);
}