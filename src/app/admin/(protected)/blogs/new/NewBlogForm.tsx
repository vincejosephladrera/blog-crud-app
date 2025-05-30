'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createBlogSchema, type CreateBlogInput } from './create-blog-schema';

import TiptapEditor from './TiptapEditor';
import { PlusIcon } from 'lucide-react';

import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormField,
	Form,
} from '@/components/shadcn/form';

import { Input } from '@/components/shadcn/input';

import { Button } from '@/components/shadcn/button';

import { useMutation } from '@tanstack/react-query';
import { createBlog } from './api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/shadcn/switch';

import { useForm } from 'react-hook-form';

export default function NewBlogForm() {
	const router = useRouter();

	const form = useForm<CreateBlogInput>({
		resolver: zodResolver(createBlogSchema),
		defaultValues: {
			isActive: true,
			title: '',
			excerpt: '',
			content: '',
			slug: '',
			thumbnailUrl: '',
		},
	});

	const { handleSubmit } = form;

	const { mutate: createBlogMutate } = useMutation({
		mutationFn: createBlog,
		onSuccess: (data) => {
			toast.success(`${data.title} has been successfully created.`);
			router.push('/admin/blogs');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit((values) => createBlogMutate(values))}>
				<div className="flex justify-between">
					<h1 className="h3 mb-4">Create Blog</h1>
					<Button type="submit" className="w-fit ml-auto">
						<span>Create Blog</span>
						<PlusIcon />
					</Button>
				</div>
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
				<div className="grid grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => {
							return (
								<FormItem className="grid gap-3">
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name="slug"
						render={({ field }) => {
							return (
								<FormItem className="grid gap-3">
									<FormLabel>Slug</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name="thumbnailUrl"
						render={({ field }) => {
							return (
								<FormItem className="grid gap-3">
									<FormLabel>Thumbnail Url</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name="excerpt"
						render={({ field }) => {
							return (
								<FormItem className="grid gap-3">
									<FormLabel>Excerpt</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
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
			</form>
		</Form>
	);
}
