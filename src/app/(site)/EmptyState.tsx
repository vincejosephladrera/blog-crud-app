import { Button } from '@/components/shadcn/button';
import { Card } from '@/components/shadcn/card';
import { RotateCcwIcon } from 'lucide-react';
import Image from 'next/image';
export default function EmptyState() {
	return (
		<Card className="w-full min-h-[900px] flex flex-col items-center justify-center text-center">
			<Image src="/images/empty-state-img.webp" alt="" width={472} height={390} className="mb-4" />
			<p className="h3 md:w-[50%]">
				It looks like there’s nothing to show here right now. Try coming back later or refreshing
				the page.
			</p>
			<Button
				onClick={() => {
					window.location.reload();
				}}
			>
				<span>Refresh The Page</span>
				<RotateCcwIcon />
			</Button>
		</Card>
	);
}
