import Form from "../../../ui/invoices/edit-form";
import Breadcrumbs from "../../../ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "../../../lib/data";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Invoices", href: "/dashboard/invoices" },
					{
						label: "Edit Invoice",
						href: `/dashboard/invoices/${id}/edit`,
						active: true,
					},
				]}
			/>
			<Form invoice={invoice} customers={customers} />
		</main>
	);
}
