import { createClient } from '@/lib/supabase/client';

export async function register({ email, password }: { email: string; password: string }) {
	const supabase = createClient();
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) throw new Error(error.message);
	return data;
}
