import { createAdminClient } from "@/lib/supabase/admin";

/** Service role para panel demo (sin auth). */
export function getPanelDb() {
	return createAdminClient();
}
