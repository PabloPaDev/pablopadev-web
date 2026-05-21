"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateAppointmentStatusAction(
	appointmentId: string,
	status: "completed" | "cancelled"
) {
	const supabase = await createClient();
	const { error } = await supabase
		.from("appointments")
		.update({ status })
		.eq("id", appointmentId);

	if (error) return { error: error.message };

	revalidatePath("/tattoo/admin/appointments");
	revalidatePath("/tattoo/admin");
	return { success: true };
}
