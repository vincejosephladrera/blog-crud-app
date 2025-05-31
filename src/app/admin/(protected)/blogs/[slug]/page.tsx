import { supabase } from '@/lib/supabase/supabase';
import { notFound } from 'next/navigation';
import UpdateBlogForm from './UpdateBlogForm';

type tParams = Promise<{ slug: string[] }>;

export default async function BlogUpdate({ params }: { params: tParams }) {
	const { slug } = await params;

	const { data, error } = await supabase.from('blogs').select('*').eq('slug', slug).single();

	if (error || !data) {
		return notFound();
	}

	const { isActive, title, slug: slugData, excerpt, content, thumbnailUrl, id } = data;

	return (
		<UpdateBlogForm
			id={id}
			isActive={isActive}
			title={title}
			slug={slugData}
			excerpt={excerpt}
			content={content}
			thumbnailUrl={thumbnailUrl}
		/>
	);
}
