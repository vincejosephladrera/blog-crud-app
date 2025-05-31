import { supabase } from '@/lib/supabase/supabase';

export async function fetchAllActiveBlogs({ pageParam = 0 }: { pageParam: number }) {
	const limit = 8;
	const from = pageParam;
	const to = from + limit - 1;

	const { data, error, count } = await supabase
		.from('blogs')
		.select('*', { count: 'exact' })
		.eq('isActive', true)
		.order('createdAt', { ascending: false })
		.range(from, to);

	if (error) {
		throw new Error(error.message);
	}

	return {
		blogs: data,
		total: count ?? 0,
		skip: pageParam,
		limit: limit,
	};
}
