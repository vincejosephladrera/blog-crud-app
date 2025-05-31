import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { supabase } from '@/lib/supabase/supabase';
import Container from '@/components/Container';
import ImageWrapper from '@/components/ImageWrapper';
import ContentRenderer from './ContentRenderer';

type tParams = Promise<{ slug: string[] }>;

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
	try {
		const { slug } = await params;
		const { data: blog, error } = await supabase
			.from('blogs')
			.select('*')
			.eq('slug', slug)
			.single();

		if (error || !blog) {
			return {
				title: 'Blog Not Found',
				description: 'The blog post you’re looking for does not exist.',
			};
		}

		return {
			title: blog.title,
			description: blog.excerpt || 'Read this blog on our site.',
			openGraph: {
				title: blog.title,
				description: blog.excerpt || 'Read this blog on our site.',
				images: [
					{
						url: blog.thumbnailUrl || '/images/featured-placeholder-img.webp',
					},
				],
			},
		};
	} catch {
		return {
			title: 'Blog Not Found',
			description: 'The blog post you’re looking for does not exist.',
		};
	}
}

export default async function BlogShow({ params }: { params: tParams }) {
	try {
		const { slug } = await params;
		const { data, error } = await supabase.from('blogs').select('*').eq('slug', slug).single();

		if (error || !data) {
			return notFound();
		}

		return (
			<>
				<section className="py-20">
					<Container>
						<h1 className="h1 mb-10">{data.title}</h1>
						<ImageWrapper
							src="/images/featured-placeholder-img.webp"
							placeholderUrl="/images/featured-placeholder-img.webp"
							className="mb-6"
						/>
						<ContentRenderer content={data.content} />
					</Container>
				</section>
			</>
		);
	} catch (e) {
		console.error(e);
		notFound();
	}
}
