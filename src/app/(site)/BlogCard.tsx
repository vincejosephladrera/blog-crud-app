import { Card, CardContent } from '@/components/shadcn/card';
import Link from 'next/link';
import { toKebabCase } from '@/lib/kebab-case';
import ImageWrapper from '@/components/ImageWrapper';

interface BlogCardProps {
	loading?: 'lazy' | 'eager';
	blog: {
		id?: string;
		title: string;
		content: string;
		thumbnailUrl?: string;
		createdAt: Date;
	};
}

export default function BlogCard({
	loading = 'lazy',
	blog: {
		title,
		thumbnailUrl = '/images/placeholder-img.webp',
		content = '',
		createdAt = new Date(),
	},
}: BlogCardProps) {
	const slug = toKebabCase(title);

	const stringDate = new Date(createdAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<li className=" h-full">
			<Card className="h-full">
				<CardContent>
					<Link href={`/${slug}`}>
						<ImageWrapper
							src={thumbnailUrl}
							placeholderUrl="/images/placeholder-img.webp"
							className="mb-4"
							alt={`${title}-thumbnail`}
							loading={loading}
						/>
					</Link>
					<Link href={`/${slug}`} className="hover:opacity-70">
						<h3 className="h3 line-clamp-3 mb-3">{title ?? 'Title'}</h3>
					</Link>
					<Link href={`/${slug}`} className="hover:opacity-70">
						<p className="line-clamp-3 mb-3">{content}</p>
					</Link>
					<p className="mb-3">{stringDate}</p>
					<Link href={`/${slug}`} className="hover:opacity-70">
						<p>Read More</p>
					</Link>
				</CardContent>
			</Card>
		</li>
	);
}
