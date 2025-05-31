'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { updateBlogSchema, type UpdateBlogInput } from './update-blog-schema';

import TiptapEditor from './TiptapEditor';
import { Edit2Icon, ArrowLeftIcon } from 'lucide-react';

import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormField,
	Form,
} from '@/components/shadcn/form';

import { Input } from '@/components/shadcn/input';

import { Button, buttonVariants } from '@/components/shadcn/button';

import { useMutation } from '@tanstack/react-query';
import { updateBlog } from './api';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/shadcn/switch';
import { ImageFileInput } from '@/components/ImageFileInput';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/shadcn/card';

import { useForm } from 'react-hook-form';
import { toKebabCase } from '@/lib/kebab-case';

export default function UpdateBlogForm({
	id,
	isActive,
	title,
	slug,
	content,
	excerpt,
	thumbnailUrl,
}: UpdateBlogInput) {
	const router = useRouter();

	const form = useForm<UpdateBlogInput>({
		resolver: zodResolver(updateBlogSchema),
		defaultValues: {
			id: id,
			isActive: isActive ?? true,
			title: title ?? '',
			slug: slug ?? '',
			content: content ?? '',
			excerpt: excerpt ?? '',
			file: undefined,
			thumbnailUrl: thumbnailUrl ?? '',
		},
	});

	const { handleSubmit } = form;

	const { mutate: updateBlogMutate } = useMutation({
		mutationFn: updateBlog,
		onSuccess: (data) => {
			toast.success(`${data.title} has been successfully updated.`);
			router.push('/admin/blogs');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return (
		<Form {...form}>
			<form className="h-full" onSubmit={handleSubmit((values) => updateBlogMutate(values))}>
				<Card className="h-full">
					<CardHeader className="flex justify-between flex-wrap">
						<h1 className="h3">{form.getValues('title')}</h1>
						<div className="flex gap-2">
							<Link className={buttonVariants({ variant: 'secondary' })} href="/admin/blogs">
								<ArrowLeftIcon />
								<span>Cancel</span>
							</Link>
							<Button type="submit" className="w-fit ml-auto">
								<span>Update Blog</span>
								<Edit2Icon />
							</Button>
						</div>
					</CardHeader>
					<CardContent className="overflow-y-auto">
						<FormField
							control={form.control}
							name="isActive"
							render={({ field }) => {
								return (
									<FormItem className="grid gap-3 mb-4">
										<FormLabel>Active</FormLabel>
										<FormControl>
											<Switch checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<div className="grid lg:grid-cols-3">
							<ImageFileInput form={form} />
						</div>
						<div className="lg:grid gap-6">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => {
									return (
										<FormItem className="flex flex-col gap-3 mb-4 lg:mb-0 lg:pb-8 relative w-full">
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input
													{...field}
													onChange={(e) => {
														field.onChange(e);
														const newTitle = e.target.value;
														form.setValue('slug', toKebabCase(newTitle));
													}}
												/>
											</FormControl>
											<FormMessage className="lg:absolute bottom-0 left-0" />
										</FormItem>
									);
								}}
							/>
							<FormField
								control={form.control}
								name="slug"
								render={({ field }) => {
									return (
										<FormItem className="grid gap-3  mb-4 lg:mb-0 lg:pb-8 relative">
											<FormLabel>Slug</FormLabel>
											<FormControl>
												<Input {...field} readOnly className="outline-0" />
											</FormControl>
											<FormMessage className="lg:absolute bottom-0 left-0" />
										</FormItem>
									);
								}}
							/>
							<FormField
								control={form.control}
								name="thumbnailUrl"
								render={({ field }) => {
									return (
										<FormItem className="grid gap-3 mb-4 lg:mb-0 lg:pb-8 relative ">
											<FormLabel>Thumbnail Url</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage className="lg:absolute bottom-0 left-0" />
										</FormItem>
									);
								}}
							/>
							<FormField
								control={form.control}
								name="excerpt"
								render={({ field }) => {
									return (
										<FormItem className="grid gap-3 mb-4 lg:mb-0 lg:pb-8 relative">
											<FormLabel>Excerpt</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage className="lg:absolute bottom-0 left-0" />
										</FormItem>
									);
								}}
							/>
							<FormField
								control={form.control}
								name="content"
								render={({ field }) => {
									return (
										<FormItem className="col-span-2 border-0">
											<FormLabel>Content</FormLabel>
											<TiptapEditor value={field.value} onChange={field.onChange} />
											<FormControl>
												<Input hidden {...field} />
											</FormControl>
										</FormItem>
									);
								}}
							/>
						</div>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}
