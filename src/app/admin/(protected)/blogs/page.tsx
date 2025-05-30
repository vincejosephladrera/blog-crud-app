import { BlogTable } from './BlogTable';
import { Card, CardContent } from '@/components/shadcn/card';

export default async function CMSBlogs() {
	return (
		<Card className="min-h-full">
			<CardContent>
				<h1 className="h3 mb-4">Blogs</h1>
				<BlogTable />
			</CardContent>
		</Card>
	);
}
