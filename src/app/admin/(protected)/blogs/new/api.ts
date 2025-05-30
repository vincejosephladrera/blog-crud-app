import { createClient } from '@/lib/supabase/client';
import { type CreateBlogInput } from './create-blog-schema';

export async function createBlog(data: CreateBlogInput) {
	const supabase = createClient();

	const { data: blog, error } = await supabase.from('blogs').insert(data).select().single();

	if (error) {
		throw new Error(error.message);
	}

	return blog;
}
