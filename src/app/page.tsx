import { redirect } from "next/navigation";

export default function EmptyPage() {
	// redirect("/default-channel");
	// redirect("/login");
	// redirect("/dashboard");
	redirect("/posts");
}
