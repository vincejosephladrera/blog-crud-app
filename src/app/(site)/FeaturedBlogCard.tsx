import { toKebabCase } from '@/lib/kebab-case';
import ImageWrapper from '@/components/ImageWrapper';
import Link from 'next/link';

interface FeatureBlogCardProp {
	title: string;
	content: string;
	thumbnailUrl?: string;
	datePublished: Date;
}

export default function FeaturedBlogCard({
	title,
	content,
	thumbnailUrl = '/images/featured-placeholder-img.webp',
	datePublished,
}: FeatureBlogCardProp) {
	const stringDate = datePublished.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const slug = toKebabCase(title);

	return (
		<>
			<Link href={`${slug}`}>
				<ImageWrapper
					aspectRatio="1216/450"
					src={thumbnailUrl}
					placeholderUrl="/images/featured-placeholder-img.webp"
					className="mb-8 rounded-xl"
					loading="eager"
				/>
			</Link>
			<div className="">
				<Link href={`${slug}`}>
					<h1 className="h1 line-clamp-2 mb-6 hover:opacity-70">{title}</h1>
				</Link>
				<Link href={`${slug}`}>
					<p className=" line-clamp-3 mb-3 hover:opacity-70">{content}</p>
				</Link>
				<p className="mb-1">{stringDate}</p>
				<Link href={`${slug}`}>
					<p className="hover:opacity-70">Read More</p>
				</Link>
			</div>
		</>
	);
}
