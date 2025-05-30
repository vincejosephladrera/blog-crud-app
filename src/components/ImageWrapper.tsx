'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { Skeleton } from './shadcn/skeleton';
import { cn } from '@/lib/utils';

type ImageWrapperProps = {
	aspectRatio: string;
	placeholderUrl: string;
	className?: string;
	src: string;
	alt?: string;
} & Omit<ImageProps, 'src' | 'alt' | 'className' | 'fill' | 'width' | 'height'>;

export default function ImageWrapper({
	aspectRatio,
	placeholderUrl,
	src,
	className,
	alt = 'Image',
	...props
}: ImageWrapperProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [imageUrl, setImageUrl] = useState(src);

	return (
		<div className={cn('w-full relative overflow-clip', `aspect-[${aspectRatio}]`, className)}>
			<Image
				{...props}
				src={imageUrl}
				alt={alt}
				fill
				className={cn(
					'transition-opacity duration-500 object-cover object-center',
					isLoading ? 'opacity-0' : 'opacity-100',
				)}
				onLoad={() => setIsLoading(false)}
				onError={() => setImageUrl(placeholderUrl)}
			/>
			{isLoading && (
				<Skeleton
					data-testid="loading-skeleton"
					className={cn('absolute inset-0 w-full h-full', `aspect-[${aspectRatio}]`)}
				/>
			)}
		</div>
	);
}
