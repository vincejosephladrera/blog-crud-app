import { supabase } from '@/lib/supabase';

export async function register({ email, password }: { email: string; password: string }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) throw new Error(error.message);
	return data;
}
