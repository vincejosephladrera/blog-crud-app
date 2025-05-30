'use client';

import { useRouter } from 'next/navigation';
import { DropdownMenuItem } from '@/components/shadcn/dropdown-menu';

export default function SignOutButton() {
	const router = useRouter();

	return (
		<DropdownMenuItem asChild>
			<button
				className="w-full"
				onClick={() => {
					localStorage.removeItem('access_token');
					router.push('/');
				}}
			>
				Sign Out
			</button>
		</DropdownMenuItem>
	);
}
