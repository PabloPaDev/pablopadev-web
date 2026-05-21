export interface Client {
	id: string;
	name: string;
	email: string | null;
	phone: string | null;
	instagram: string | null;
	notes: string | null;
	created_at: string;
	updated_at: string | null;
}

export interface AppointmentRequest {
	id: string;
	client_name: string;
	client_email: string;
	client_phone: string | null;
	client_instagram: string | null;
	tattoo_idea: string;
	body_zone: string | null;
	size_estimate: string | null;
	preferred_date: string | null;
	preferred_time_text: string | null;
	status: string;
	internal_notes: string | null;
	created_client_id: string | null;
	created_appointment_id: string | null;
	created_at: string;
	updated_at: string | null;
}

export interface Appointment {
	id: string;
	client_id: string;
	title: string;
	description: string | null;
	starts_at: string;
	ends_at: string;
	status: string;
	price_estimate: number | null;
	deposit_paid: boolean;
	google_calendar_event_id: string | null;
	created_from_request_id: string | null;
	created_at: string;
	updated_at: string | null;
	clients?: Pick<Client, "name" | "email" | "phone"> | null;
}
