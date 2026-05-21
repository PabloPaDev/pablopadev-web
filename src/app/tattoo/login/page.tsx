import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TattooShell, TattooHeader, TattooCard } from "@/app/tattoo/components/tattoo-shell";
import { LoginForm } from "@/app/tattoo/login/login-form";

export default async function TattooLoginPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		redirect("/tattoo/admin");
	}

	return (
		<TattooShell>
			<TattooHeader
				title="Acceso privado"
				displayTitle
				subtitle="Panel de gestión del estudio."
				backHref="/tattoo"
			/>
			<main className="mx-auto max-w-md px-4 py-10 sm:px-6">
				<TattooCard>
					<LoginForm />
				</TattooCard>
			</main>
		</TattooShell>
	);
}
