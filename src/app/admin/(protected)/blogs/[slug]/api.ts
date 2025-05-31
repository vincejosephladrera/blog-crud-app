import { createClient } from '@/lib/supabase/client';
import { type UpdateBlogInput } from './update-blog-schema';

export async function updateBlog(data: UpdateBlogInput) {
	const supabase = createClient();

	const { data: blog, error } = await supabase
		.from('blogs')
		.update(data)
		.eq('id', data.id)
		.select()
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return blog;
}
