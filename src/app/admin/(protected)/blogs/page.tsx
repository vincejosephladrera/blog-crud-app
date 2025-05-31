import BlogTable from './BlogTable';
import { Card, CardContent } from '@/components/shadcn/card';
import Link from 'next/link';
import { buttonVariants } from '@/components/shadcn/button';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';

export default async function CMSBlogs() {
	return (
		<Card className="min-h-full">
			<CardContent>
				<h1 className="h3 mb-4">Blogs</h1>
				<Link
					className={cn(buttonVariants({ variant: 'default' }), 'ml-auto flex w-fit mb-6')}
					href="/admin/blogs/new"
				>
					<PlusIcon />
					<span>Create Blog</span>
				</Link>
				<BlogTable />
			</CardContent>
		</Card>
	);
}
