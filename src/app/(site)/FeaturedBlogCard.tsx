import ImageWrapper from '@/components/ImageWrapper';
import Link from 'next/link';

interface FeatureBlogCardProp {
	title: string;
	excerpt: string;
	thumbnailUrl?: string;
	datePublished: Date;
	slug: string;
}

export default function FeaturedBlogCard({
	title,
	excerpt,
	thumbnailUrl = '/images/placeholder-img.webp',
	datePublished,
	slug,
}: FeatureBlogCardProp) {
	const stringDate = new Date(datePublished).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<>
			<Link href={`${slug}`}>
				<ImageWrapper
					src={thumbnailUrl}
					placeholderUrl="/images/placeholder-img.webp"
					className="mb-8 rounded-xl"
					loading="eager"
				/>
			</Link>
			<div className="">
				<Link href={`${slug}`}>
					<h1 className="h1 line-clamp-2 mb-6 hover:opacity-70">{title}</h1>
				</Link>
				<Link href={`${slug}`}>
					<p className=" line-clamp-3 mb-3 hover:opacity-70">{excerpt}</p>
				</Link>
				<p className="mb-1">{stringDate}</p>
				<Link href={`${slug}`}>
					<p className="hover:opacity-70">Read More</p>
				</Link>
			</div>
		</>
	);
}
