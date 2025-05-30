import { supabase } from '@/lib/supabase';

export async function login({ email, password }: { email: string; password: string }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) throw new Error(error.message);
	return data;
}
