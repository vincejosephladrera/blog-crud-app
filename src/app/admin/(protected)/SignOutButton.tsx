'use client';

import { useRouter } from 'next/navigation';
import { DropdownMenuItem } from '@/components/shadcn/dropdown-menu';
import { signOut } from './api';

export default function SignOutButton() {
	const router = useRouter();

	return (
		<DropdownMenuItem asChild>
			<button
				className="w-full"
				onClick={async () => {
					await signOut();
					router.push('/');
				}}
			>
				Sign Out
			</button>
		</DropdownMenuItem>
	);
}
