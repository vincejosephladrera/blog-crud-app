import { Card, CardContent } from '@/components/shadcn/card';
import NewBlogForm from './NewBlogForm';

export default function NewBlog() {
	return (
		<Card className="min-h-full">
			<CardContent>
				<NewBlogForm />
			</CardContent>
		</Card>
	);
}
