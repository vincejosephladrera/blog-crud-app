'use client';

import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from './shadcn/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/shadcn/form';
import Image from 'next/image';
import { upload } from '@/lib/upload';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { UpdateBlogInput } from '@/app/admin/(protected)/blogs/[slug]/update-blog-schema';

export function ImageFileInput({ form }: { form: UseFormReturn<UpdateBlogInput> }) {
	const thumbnailUrl = form.getValues().thumbnailUrl;
	const [imageSrc, setImageSrc] = useState(thumbnailUrl || '/images/placeholder.jpg');
	const [isLoading, setIsLoading] = useState(false);

	const { mutate: uploadImageMutate, isPending } = useMutation({
		mutationFn: upload,
		onSuccess: (url: string) => {
			toast.success('Image uploaded successfully!');
			setImageSrc(url);
			form.setValue('thumbnailUrl', url);
		},
		onError: (error) => {
			toast.error(error.message || 'Upload failed');
		},
	});

	return (
		<FormField
			control={form.control}
			name="thumbnailUrl"
			render={() => (
				<FormItem className="grid gap-3 mb-4">
					<FormLabel>Photo</FormLabel>
					<div className="w-full aspect-video relative rounded-xl overflow-clip">
						{(isPending || isLoading) && (
							<div className="w-full h-full absolute left-0 top-0 flex z-50 bg-background">
								<div className="spinner"></div>
							</div>
						)}
						<Image
							src={imageSrc}
							alt="Selected image"
							fill
							onLoad={() => setIsLoading(false)}
							style={{ objectFit: 'cover', objectPosition: 'center' }}
						/>
					</div>
					<FormControl>
						<Input
							type="file"
							accept="image/webp,image/jpeg,image/png,image/svg+xml"
							onChange={(e) => {
								const file = e.target.files?.[0];
								if (!file) return;
								setIsLoading(true);
								uploadImageMutate(file);
							}}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
