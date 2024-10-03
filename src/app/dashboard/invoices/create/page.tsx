/* eslint-disable */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Form from "../../ui/invoices/create-form";
import Breadcrumbs from "../../ui/invoices/breadcrumbs";
import { fetchCustomers } from "../../lib/data";

export default async function Page() {
	const customers = await fetchCustomers();

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Invoices", href: "/dashboard/invoices" },
					{
						label: "Create Invoice",
						href: "/dashboard/invoices/create",
						active: true,
					},
				]}
			/>
			<Form customers={customers} />
		</main>
	);
}
