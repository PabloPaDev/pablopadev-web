export type AppointmentRequestStatus =
	| "pending"
	| "accepted"
	| "rejected"
	| "needs_more_info";

export type AppointmentStatus =
	| "pending"
	| "confirmed"
	| "completed"
	| "cancelled";

export type EmailLogStatus = "sent" | "failed";

export interface Client {
	id: string;
	name: string;
	email: string | null;
	phone: string | null;
	instagram: string | null;
	notes: string | null;
	created_at: string;
	updated_at?: string | null;
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
	status: AppointmentRequestStatus;
	created_client_id: string | null;
	created_appointment_id: string | null;
	created_at: string;
	updated_at?: string | null;
}

export interface Appointment {
	id: string;
	client_id: string;
	title: string;
	description: string | null;
	starts_at: string;
	ends_at: string;
	status: AppointmentStatus;
	price_estimate: number | null;
	deposit_paid: number | null;
	created_from_request_id: string | null;
	google_calendar_event_id: string | null;
	created_at: string;
	updated_at?: string | null;
	clients?: Client | null;
}

export interface ClientNote {
	id: string;
	client_id: string;
	note: string;
	created_at: string;
}

export interface TattooFile {
	id: string;
	client_id: string;
	appointment_id: string | null;
	file_url: string;
	file_type: string | null;
	description: string | null;
	created_at: string;
}

export interface EmailLog {
	id: string;
	recipient_email: string;
	subject: string;
	email_type: string;
	status: EmailLogStatus;
	error_message: string | null;
	appointment_request_id: string | null;
	appointment_id: string | null;
	client_id: string | null;
	created_at: string;
}
