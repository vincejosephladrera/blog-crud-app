import { Skeleton } from '@/components/shadcn/skeleton';
import { Card, CardContent } from '@/components/shadcn/card';

export default function BlogSkeleton() {
	return Array.from({ length: 8 }).map((_, i) => {
		return (
			<li key={i}>
				<Card>
					<CardContent>
						<Skeleton className="w-full aspect-[360/240] mb-4" />
						<div className="mb-4">
							<Skeleton className="w-full h-[24px] mb-2" />
							<Skeleton className="w-[80%] h-[24px] mb-2" />
						</div>
						<div>
							<Skeleton className="w-full h-[18px] mb-2" />
							<Skeleton className="w-[80%] h-[18px] mb-2" />
							<Skeleton className="w-[60%] h-[18px] mb-2" />
						</div>
					</CardContent>
				</Card>
			</li>
		);
	});
}
