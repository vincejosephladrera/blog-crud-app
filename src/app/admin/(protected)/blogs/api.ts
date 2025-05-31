import { supabase } from '@/lib/supabase/supabase';
import { createClient } from '@/lib/supabase/client';

export async function fetchAllBlogs({ limit = 10, skip = 0 }: { limit?: number; skip?: number }) {
	const from = skip;
	const to = skip + limit - 1;

	const { data, error, count } = await supabase
		.from('blogs')
		.select('*', { count: 'exact' })
		.range(from, to);

	if (error) {
		throw error;
	}

	return { data, count };
}

export async function deleteBlog({ slug }: { slug: string }) {
	const authSupabase = createClient();

	const { data, error } = await authSupabase
		.from('blogs')
		.delete()
		.eq('slug', slug)
		.select()
		.single();

	if (error) {
		throw error;
	}

	return data;
}
