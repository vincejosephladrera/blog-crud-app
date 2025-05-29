'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from '@/components/shadcn/skeleton';

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
	const [photoUrl, setPhotoUrl] = useState(thumbnailUrl);

	const [isImageLoading, setIsImageLoading] = useState(true);

	const stringDate = datePublished.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<>
			<div className=" w-full aspect-[1216/450] relative overflow-clip rounded-xl mb-10">
				{isImageLoading && (
					<Skeleton
						className=" w-full absolute top-0 left-0 aspect-[1216/450]"
						data-testid="loading-skeleton"
					/>
				)}
				<Image
					src={photoUrl}
					fill
					alt=""
					objectFit="cover"
					objectPosition="center"
					loading="eager"
					onLoad={() => {
						setIsImageLoading(false);
					}}
					onError={() => {
						setPhotoUrl('/images/featured-placeholder-img.webp');
					}}
				/>
			</div>
			<div className="md:w-[50%]">
				<h1 className="h1 line-clamp-2 mb-6">{title}</h1>
				<p className=" line-clamp-3 mb-6">{content}</p>
				<p>{stringDate}</p>
			</div>
		</>
	);
}
