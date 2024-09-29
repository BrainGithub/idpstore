// eslint-disable-next-line no-unused-vars
import Link from "next/link";
import { NavLink } from "./NavLink";
// eslint-disable-next-line no-unused-vars
import { executeGraphQL } from "@/lib/graphql";
// eslint-disable-next-line no-unused-vars
import { MenuGetBySlugDocument } from "@/gql/graphql";
import { url } from "inspector";

// eslint-disable-next-line no-unused-vars
export const NavLinks = async ({ channel }: { channel: string }) => {
	console.log("channel", channel);
	const url = "http://127.0.0.1:" + process.env.PORT;
	let postsUrl = url + "/posts";
	let imagesUrl = url + "/images";
	let dashboardUrl = url + "/dashboard";
	// const navLinks = {
	// 	menu: {
	// 		items: [
	// 			{
	// 				id: "TWVudUl0ZW06MjI1",
	// 				name: "Posts",
	// 				level: 0,
	// 				category: {
	// 					id: "Q2F0ZWdvcnk6Mjc=",
	// 					slug: "posts",
	// 					name: "Posts",
	// 				},
	// 				collection: null,
	// 				page: null,
	// 				url: "http://localhost:3000",
	// 				children: [
	// 					{
	// 						id: "TWVudUl0ZW06MjM4",
	// 						name: "Images",
	// 						level: 1,
	// 						category: {
	// 							id: "Q2F0ZWdvcnk6Mzg=",
	// 							slug: "images",
	// 							name: "Images",
	// 						},
	// 						collection: null,
	// 						page: null,
	// 						url: "http://localhost:3000",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: "TWVudUl0ZW06MjIz",
	// 				name: "Dashboard",
	// 				level: 0,
	// 				category: {
	// 					id: "Q2F0ZWdvcnk6MjU=",
	// 					slug: "dashboard",
	// 					name: "Dashboard",
	// 				},
	// 				collection: null,
	// 				page: null,
	// 				url: null,
	// 				children: [
	// 					{
	// 						id: "TWVudUl0ZW06MjQw",
	// 						name: "Customers",
	// 						level: 1,
	// 						category: {
	// 							id: "Q2F0ZWdvcnk6NDE=",
	// 							slug: "customers",
	// 							name: "Customers",
	// 						},
	// 						collection: null,
	// 						page: null,
	// 						url: null,
	// 					},
	// 					{
	// 						id: "TWVudUl0ZW06MjI0",
	// 						name: "Invoices",
	// 						level: 1,
	// 						category: {
	// 							id: "Q2F0ZWdvcnk6MjY=",
	// 							slug: "invoices",
	// 							name: "Invoices",
	// 						},
	// 						collection: null,
	// 						page: null,
	// 						url: null,
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
	// };

	// console.log(navLinks.menu.items);

	// return (
	// 	<>
	// 		{/* <NavLink href="/dashboard">Dashboard</NavLink> */}
	// 		{navLinks.menu?.items?.map((item) => {
	// 			if (item.category) {
	// 				return (
	// 					<NavLink key={item.id} href={`/categories/${item.category.slug}`}>
	// 						{item.category.name}
	// 					</NavLink>
	// 				);
	// 			}
	// 			if (item.collection) {
	// 				return (
	// 					<NavLink key={item.id} href={`/collections/${item.collection.slug}`}>
	// 						{item.collection.name}
	// 					</NavLink>
	// 				);
	// 			}
	// 			if (item.page) {
	// 				return (
	// 					<NavLink key={item.id} href={`/pages/${item.page.slug}`}>
	// 						{item.page.title}
	// 					</NavLink>
	// 				);
	// 			}
	// 			if (item.url) {
	// 				return (
	// 					<Link key={item.id} href={item.url}>
	// 						{item.name}
	// 					</Link>
	// 				);
	// 			}
	// 			return null;
	// 		})}
	// 	</>
	// );
	return (
		<>
			<NavLink key={"posts"} href={postsUrl}>
				posts
			</NavLink>
			<NavLink key={"images"} href={imagesUrl}>
				images
			</NavLink>
			<NavLink key={"dashboard"} href={dashboardUrl}>
				dashboard
			</NavLink>
		</>
	);
};
