import { notFound } from 'next/navigation';
import { getBlog } from './api/api';
import Container from '@/components/Container';
import ImageWrapper from '@/components/ImageWrapper';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	try {
		const blog = await getBlog();

		return {
			title: `${blog.title}`,
			description: blog.content || 'Read this blog on our site.',
			openGraph: {
				title: blog.title,
				description: blog.content || 'Read this blog on our site.',
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

export default async function BlogShow() {
	try {
		const blog = await getBlog();

		const { title, content } = blog;

		return (
			<>
				<section className="py-20">
					<Container>
						<h1 className="h1 mb-10">{title}</h1>
						<ImageWrapper
							src="/images/featured-placeholder-img.webp"
							placeholderUrl="/images/featured-placeholder-img.webp"
							aspectRatio="1216/450"
							className="mb-6"
						/>
						{content}
					</Container>
				</section>
			</>
		);
	} catch (e) {
		console.error(e);
		notFound();
	}
}
