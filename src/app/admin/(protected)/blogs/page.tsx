import BlogTable from './BlogTable';
import { Card, CardHeader } from '@/components/shadcn/card';
import Link from 'next/link';
import { buttonVariants } from '@/components/shadcn/button';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';

export default async function CMSBlogs() {
	return (
		<Card className="min-h-full">
			<CardHeader className="flex justify-between">
				<h1 className="h3">Blogs</h1>
				<Link
					className={cn(buttonVariants({ variant: 'default' }), 'ml-auto flex w-fit ')}
					href="/admin/blogs/new"
				>
					<PlusIcon />
					<span>Create Blog</span>
				</Link>
			</CardHeader>
			<BlogTable />
		</Card>
	);
}
